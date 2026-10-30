import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { FillOrderHandler } from './fill-order.handler';
import { FillOrderDto } from './dto/fill-order.dto';

@Controller('fill-order')
export class FillOrderController {
  constructor(private readonly handler: FillOrderHandler) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  handle(@Body() payload: FillOrderDto[]) {
    return this.handler.handle(payload);
  }
}
