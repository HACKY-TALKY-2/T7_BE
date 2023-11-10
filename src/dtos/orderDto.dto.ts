import {
  IsNumber,
  IsNotEmpty,
  IsString,
  IsDate,
  IsArray,
} from 'class-validator';
import { MenuEntity, OrderEntity } from 'src/entities';

export class OrderDto {
  @IsNumber()
  @IsNotEmpty()
  menuId: number;

  @IsNumber()
  @IsNotEmpty()
  count: number;
}

export class OrderMenuDto {
  @IsString()
  menuName: string;

  @IsNumber()
  count: number;

  @IsNumber()
  price: number;

  static ToDto(menu: MenuEntity, count: number): OrderMenuDto {
    return {
      menuName: menu.name,
      count: count,
      price: menu.price,
    };
  }
}

export class OrderListDto {
  @IsString()
  userId: string;

  @IsNumber()
  orderId: number;

  @IsDate()
  orderedAt: Date;

  @IsArray()
  menu: OrderMenuDto[];

  static ToDto(order: OrderEntity, menu: OrderMenuDto[]): OrderListDto {
    return {
      userId: order.user.userId,
      orderId: order.id,
      orderedAt: order.orderedAt,
      menu: menu,
    };
  }
}
