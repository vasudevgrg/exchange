import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Market } from './market.entity';
import { Trade } from './trade.entity';
import { User } from './user.entity';

@Entity('order')
export class Order extends BaseEntity {
  @Column({ type: 'int', name: 'user_id', nullable: false })
  user_id: number;

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int', name: 'market_id', nullable: false })
  market_id: number;

  @ManyToOne(() => Market, (market) => market.orders, { nullable: false })
  @JoinColumn({ name: 'market_id' })
  market: Market;

  @Column({ type: 'decimal', precision: 20, scale: 8, nullable: false })
  quantity: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 8,
    nullable: false,
    default: 0,
  })
  fulfilled_quantity: number;

  @ManyToMany(() => Trade, (trade) => trade.buyOrders)
  buyTrades: Trade[];

  @ManyToMany(() => Trade, (trade) => trade.sellOrders)
  sellTrades: Trade[];
}
