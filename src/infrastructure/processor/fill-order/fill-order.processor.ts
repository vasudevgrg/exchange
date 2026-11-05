import { Injectable } from '@nestjs/common';
import { FillOrderHandler } from "src/features/fill-orders/fill-order.handler";
import { FillOrderDto } from "src/features/fill-orders/dto/fill-order.dto";

@Injectable()
export class FillOrderProcessor {
    constructor(
        private readonly handler: FillOrderHandler
    ) {}

    async handleEvent (payload: FillOrderDto[]) {
        await this.handler.handle(payload);
    }
}