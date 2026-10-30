import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Market } from '../../domain/market.entity';
import { Order } from '../../domain/order.entity';
import { RedisModule } from '../../infrastructure/redis/redis.module';
import { CreateOrderController } from './create-order.controller';
import { CreateOrderHandler } from './create-order.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Market]), RedisModule],
  controllers: [CreateOrderController],
  providers: [CreateOrderHandler],
})
export class CreateOrderModule {}
