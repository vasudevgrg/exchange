import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../domain/order.entity';
import { RedisModule } from '../../infrastructure/redis/redis.module';
import { FillOrderController } from './fill-order.controller';
import { FillOrderHandler } from './fill-order.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), RedisModule],
  controllers: [FillOrderController],
  providers: [FillOrderHandler],
})
export class FillOrdersModule {}
