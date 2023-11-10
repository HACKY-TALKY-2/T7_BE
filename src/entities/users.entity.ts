import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: String,
    unique: true,
  })
  userId: string;

  @Column({
    type: String,
  })
  password: string;

  @Column({
    type: Number,
  })
  point: number;
}
