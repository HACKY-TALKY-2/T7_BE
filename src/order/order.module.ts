import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderEntity, OrderMenuEntity, MenuEntity } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderMenuEntity, MenuEntity]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
