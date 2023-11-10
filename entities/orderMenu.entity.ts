import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MenuEntity } from './menu.entity';

@Entity()
export class OrderEntity {
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
