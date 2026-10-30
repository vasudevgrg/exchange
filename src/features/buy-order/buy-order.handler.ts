import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { StorageHandler } from "src/infrastructure/in-memory-storage/storage.handler";
import { RedisManager } from "src/infrastructure/redis/redis-manager";

@Injectable()
export class BuyOrderHandler {
    constructor(

        private storageHandler: StorageHandler,
        private redisHandler: RedisManager
    ) {

    }

    async handle(payload: any) {
        const { quantity, price, market, user_id } = payload;
        const fills = this.storageHandler.getSellOrders(payload.market, payload.quantity, payload.price);
        let totalCOnsumed = 0;

        const fillEvents = fills.map((fill) => {
            totalCOnsumed += fill.quantity;
            return { order_uuid: fill.order.id, quantity: fill.quantity };
        });

        const newOrder = {
            id: randomUUID(),
            price,
            quantity: quantity - totalCOnsumed,
            user_id,
            timestamp: Date.now()
        }

        if (newOrder.quantity > 0) {
            this.storageHandler.set(newOrder,
                'buy',
                market
            )
        };

        await this.redisHandler.publishMessage("create_order", {
            uuid: newOrder.id,
            user_id,
            market,
            quantity,
            fulfilled_quantity: totalCOnsumed,
        });
        if (fillEvents.length > 0) {
            await this.redisHandler.publishMessage(
                "fill_order",
                fillEvents,
            );
        }



    }
}