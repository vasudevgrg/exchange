import { CreateOrderHandler } from "src/features/create-order/create-order.handler";

export class CreateOrderProcessor {
    constructor(
        private readonly handler: CreateOrderHandler
    ) {}

    async handleEvent (payload) {
        await this.handler.handle(payload);
    }
}