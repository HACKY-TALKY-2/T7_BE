import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MenuEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: String,
  })
  name: string;

  @Column({
    type: Number,
  })
  price: number;

  @Column({
    type: String,
  })
  image: string;

  @Column()
  category: string;
}
