import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: String,
  })
  nickname: string;

  @Column()
  cost: number;

  @Column({
    type: Boolean,
  })
  isFinished: boolean;

  @CreateDateColumn()
  orderedAt: Date;
}
