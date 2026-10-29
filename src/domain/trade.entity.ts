import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Market } from './market.entity';
import { Order } from './order.entity';

@Entity('trade')
export class Trade extends BaseEntity {
  @Column({ type: 'int', name: 'market_id', nullable: false })
  market_id: number;

  @ManyToOne(() => Market, (market) => market.trades, { nullable: false })
  @JoinColumn({ name: 'market_id' })
  market: Market;

  @Column({ type: 'decimal', precision: 20, scale: 8, nullable: false })
  quantity: number;

  @Column({ type: 'decimal', precision: 20, scale: 8, nullable: false })
  price: number;

  @Column({ type: 'int', array: true, nullable: false, default: () => "'{}'" })
  sell_order_ids: number[];

  @Column({ type: 'int', array: true, nullable: false, default: () => "'{}'" })
  buy_order_ids: number[];

  @ManyToMany(() => Order, (order) => order.buyTrades)
  @JoinTable({ name: 'trade_buy_orders' })
  buyOrders: Order[];

  @ManyToMany(() => Order, (order) => order.sellTrades)
  @JoinTable({ name: 'trade_sell_orders' })
  sellOrders: Order[];
}
