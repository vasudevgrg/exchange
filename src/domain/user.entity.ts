import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Order } from './order.entity';

@Entity('user')
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 8,
    nullable: false,
    default: 0,
  })
  balance: number;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
