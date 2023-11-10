import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { OrderService } from './order.service';
import { OrderDto } from 'src/dtos/orderDto.dto';
import { JwtPayload } from 'src/interfaces/auth';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/menu')
  getMenu() {
    return this.orderService.getMenu();
  }

  @UseGuards(AuthGuard('access'))
  @Post()
  async postOrder(
    @Req() req: Request,
    @Body() orderDtos: OrderDto[],
    @Res() res: Response,
  ) {
    const { id } = req.user as JwtPayload;
    try {
      await this.orderService.order(id, orderDtos);
      return res.sendStatus(200);
    } catch (err) {
      return res.send(err);
    }
  }

  @UseGuards(AuthGuard('access'))
  @Get('/queue')
  async getOrderQueue(@Res() res: Response) {
    const orderQueue = await this.orderService.orderQueue();
    return res.send(orderQueue);
  }
}
