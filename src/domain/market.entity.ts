import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Order } from './order.entity';
import { Trade } from './trade.entity';

@Entity('market')
export class Market extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @OneToMany(() => Order, (order) => order.market)
  orders: Order[];

  @OneToMany(() => Trade, (trade) => trade.market)
  trades: Trade[];
}
