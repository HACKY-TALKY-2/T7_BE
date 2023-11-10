import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './users.entity';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column({
    type: Boolean,
  })
  isFinished: boolean;

  @CreateDateColumn()
  orderedAt: Date;
}
