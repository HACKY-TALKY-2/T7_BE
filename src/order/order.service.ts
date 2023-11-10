import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity, OrderMenuEntity, MenuEntity } from 'src/entities';
import { OrderDto, OrderListDto, OrderMenuDto } from 'src/dtos/orderDto.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderMenuEntity)
    private readonly orderMenuRepository: Repository<OrderMenuEntity>,
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
    private readonly userService: UserService,
  ) {}

  getMenu() {
    return this.menuRepository.find();
  }

  async order(id: number, orderDtos: OrderDto[]) {
    const userEntity = await this.userService.findUserById(id);
    const orderRepo = await this.orderRepository.create({
      user: userEntity,
      orderedAt: new Date(),
      isFinished: false,
    });
    const orderEntity = await this.orderRepository.save(orderRepo);

    orderDtos.forEach(async (order) => {
      const { menuId, count } = order;
      const menu = await this.menuRepository.findOne({ where: { id: menuId } });
      const orderMenu = await this.orderMenuRepository.create({
        order: orderEntity,
        menu: menu,
        count: count,
      });
      await this.orderMenuRepository.save(orderMenu);
    });
  }

  async orderQueue() {
    const orders = await this.orderRepository.find({
      where: { isFinished: false },
      relations: ['user'],
    });

    const result = await Promise.all(
      orders.map(async (order) => {
        const orderMenuItems = await this.orderMenuRepository.find({
          where: { order: order },
          relations: ['menu'],
        });
        const orderMenuDtos = await Promise.all(
          orderMenuItems.map(async (orderMenu): Promise<OrderMenuDto> => {
            console.log(orderMenu.menu as MenuEntity);
            return await OrderMenuDto.ToDto(orderMenu.menu, orderMenu.count);
          }),
        );
        console.log(orderMenuDtos);
        return OrderListDto.ToDto(order, orderMenuDtos);
      }),
    );
    console.log(result);
    return result;
  }
}
