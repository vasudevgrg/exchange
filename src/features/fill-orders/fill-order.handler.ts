import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../domain/order.entity';
import { Repository } from 'typeorm';
import { FillOrderDto } from './dto/fill-order.dto';

@Injectable()
export class FillOrderHandler {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async handle(fills: FillOrderDto[]): Promise<Order[]> {
    return this.orderRepository.manager.transaction(async (manager) => {
      const updatedOrders: Order[] = [];

      for (const fill of fills) {
        const order = await manager.findOne(Order, {
          where: { uuid: fill.order_uuid },
          lock: { mode: 'pessimistic_write' },
        });
        if (!order) {
          throw new NotFoundException(
            `Order ${fill.order_uuid} was not found`,
          );
        }

        order.fulfilled_quantity =
          Number(order.fulfilled_quantity) + fill.quantity;
        updatedOrders.push(await manager.save(Order, order));
      }

      return updatedOrders;
    });
  }
}
