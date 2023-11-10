import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { OrderEntity } from 'src/entities';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([OrderEntity])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
