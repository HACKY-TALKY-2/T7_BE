import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderEntity, OrderMenuEntity, MenuEntity } from 'src/entities';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([OrderEntity, OrderMenuEntity, MenuEntity]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
