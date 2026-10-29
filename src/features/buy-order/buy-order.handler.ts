import { Controller } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomUUID } from "node:crypto";
import { Order } from "src/domain/order.entity";
import { StorageHandler } from "src/infrastructure/in-memory-storage/storage.handler";
import { RedisManager } from "src/infrastructure/redis/redis-manager";
import { Repository } from "typeorm";

@Controller('/buy-order')
export class BuyOrderHandler {
    constructor(

        private storageHandler: StorageHandler,
        private redisHandler: RedisManager
    ) {

    }

    async handle(payload: any) {
        const { quantity, price, market } = payload;
        const fills = this.storageHandler.getSellOrders(payload.market, payload.quantity, payload.price);
        let totalCOnsumed = 0;

        const updatedPayload = fills.map(fills => {
            totalCOnsumed += fills.quantity;
            if (fills.order.quantity == fills.quantity) {
                return { status: 'fulfilled', ...fills.order }
            } else {
                return fills.order;
            }

        });

        const new_order = {
            id: randomUUID(),
            price,
            quantity: quantity - totalCOnsumed,
            timestamp: Date.now()
        }

        if (totalCOnsumed < quantity) {
            this.storageHandler.set(new_order,
                'buy',
                market
            )
            await this.redisHandler.publishMessage('order_create', updatedPayload);
        };

        await this.redisHandler.publishMessage('order_fill', updatedPayload);




    }
}