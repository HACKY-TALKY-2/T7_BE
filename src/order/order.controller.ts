import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/menu')
  getMenu() {
    return this.orderService.getMenu();
  }
}
