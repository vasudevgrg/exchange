import { Injectable } from '@nestjs/common';
import { CreateOrderHandler } from "src/features/create-order/create-order.handler";
import { CreateOrderDto } from "src/features/create-order/dto/create-order.dto";

@Injectable()
export class CreateOrderProcessor {
    constructor(
        private readonly handler: CreateOrderHandler
    ) {}

    async handleEvent (payload: CreateOrderDto) {
        await this.handler.handle(payload);
    }
}