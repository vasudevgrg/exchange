import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateOrderHandler } from './create-order.handler';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('create-order')
export class CreateOrderController {
  constructor(private readonly handler: CreateOrderHandler) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  handle(@Body() payload: CreateOrderDto) {
    return this.handler.handle(payload);
  }
}
