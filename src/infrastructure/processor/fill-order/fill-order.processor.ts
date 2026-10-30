import { CreateOrderHandler } from "src/features/create-order/create-order.handler";
import { FillOrderHandler } from "src/features/fill-orders/fill-order.handler";

export class FillOrderProcessor {
    constructor(
        private readonly handler: FillOrderHandler
    ) {}

    async handleEvent (payload) {
        await this.handler.handle(payload);
    }
}