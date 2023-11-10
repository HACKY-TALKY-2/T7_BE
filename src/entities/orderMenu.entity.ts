import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MenuEntity } from './menu.entity';
import { OrderEntity } from './order.entity';

@Entity()
export class OrderMenuEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderEntity)
  order: OrderEntity;

  @ManyToOne(() => MenuEntity)
  menu: MenuEntity;

  @Column({
    type: Number,
  })
  count: number;
}
