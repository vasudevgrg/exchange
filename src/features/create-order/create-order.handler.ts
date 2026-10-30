import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Market } from '../../domain/market.entity';
import { Order } from '../../domain/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class CreateOrderHandler {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Market)
    private readonly marketRepository: Repository<Market>,
  ) {}

  async handle(payload: CreateOrderDto): Promise<Order> {
    const uuid = payload.uuid ?? randomUUID();
    const market = payload.market_id
      ? await this.marketRepository.findOneBy({ id: payload.market_id })
      : await this.marketRepository.findOneBy({ name: payload.market });

    if (!market) {
      throw new NotFoundException('Market not found');
    }

    const existingOrder = await this.orderRepository.findOneBy({ uuid });
    if (existingOrder) {
      return existingOrder;
    }

    return this.orderRepository.save(
      this.orderRepository.create({
        uuid,
        user_id: payload.user_id,
        market_id: market.id,
        quantity: payload.quantity,
        fulfilled_quantity: payload.fulfilled_quantity ?? 0,
      }),
    );
  }
}
