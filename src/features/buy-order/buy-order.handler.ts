import { Controller } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomUUID } from "node:crypto";
import { Order } from "src/domain/order.entity";
import { StorageHandler } from "src/infrastructure/in-memory-storage/storage.handler";
import { Repository } from "typeorm";

@Controller('/buy-order')
export class BuyOrderHandler {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,

        private storageHandler: StorageHandler
    ) {

    }

    async handler (payload: any) {
        const {quantity, price, market} = payload;
        const fills = this.storageHandler.getSellOrders(payload.market, payload.quantity, payload.price);
        let totalCOnsumed = 0;

        const updatedPayload = fills.map( fills => {
            totalCOnsumed+=fills.quantity;
            if(fills.order.quantity == fills.quantity) {
                return {status: 'fulfilled',...fills.order}
            } else {
                return fills.order;
            }

        });

        if(totalCOnsumed< quantity) {
            this.storageHandler.set({
                id: randomUUID(),
                price,
                quantity: quantity-totalCOnsumed,
                timestamp: Date.now()
            },
            'buy',
            market
        )
        };

        //add code for redis-- new order is placed and then the orders which are consumed


     }
}