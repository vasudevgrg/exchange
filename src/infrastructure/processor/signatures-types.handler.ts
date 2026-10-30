import { Injectable } from "@nestjs/common";
import { CreateOrderProcessor } from "./create-order/create-order.processor";
import { FillOrderProcessor } from "./fill-order/fill-order.processor";

@Injectable()
export class SignatureTypes {
    constructor(
        private readonly createOrderProcessor: CreateOrderProcessor,
        private readonly fillOrderProcessor: FillOrderProcessor
    ) {}

    public signatureTypes = {
        'create_order':  this.createOrderProcessor,
        "fill_order": this.fillOrderProcessor
    }
}