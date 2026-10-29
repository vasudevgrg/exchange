import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { BuyOrderHandler } from "./buy-order.handler";
import { Response } from "express";

@Controller('/buy-order')
export class BuyOrderController {
    constructor(
        private readonly handler: BuyOrderHandler
    ) {}

    @Post()
    async handle (
        @Body() payload: any,
        @Res() res: Response
    ) {

        await this.handler.handle(payload);
        return res.status(HttpStatus.OK).json('order placed successfully')

    }
}