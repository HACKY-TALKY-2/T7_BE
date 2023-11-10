import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity, OrderMenuEntity, MenuEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderMenuEntity)
    private readonly orderMenuRepository: Repository<OrderMenuEntity>,
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {}

  getMenu() {
    const menuEntity = this.menuRepository.create({ name: "hi", price: 10, image: "htae"});
    return this.menuRepository.save(menuEntity);
    // return this.menuRepository.find();
  }
}
