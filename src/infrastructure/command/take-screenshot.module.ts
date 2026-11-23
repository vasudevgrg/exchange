import { Module } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { CreateOrderModule } from '../../features/create-order/create-order.module';
import { FillOrdersModule } from '../../features/fill-orders/fill-orders.module';
import { CreateOrderProcessor } from '../processor/create-order/create-order.processor';
import { FillOrderProcessor } from '../processor/fill-order/fill-order.processor';
import { SignatureTypes } from '../processor/signatures-types.handler';
import { RedisModule } from '../redis/redis.module';
import { HandleMessagesCommand } from './handle-messages';
import { StorageModule } from '../in-memory-storage/storage.module';
import { TakeScreenshotHandler } from './take-screenshot-handler';

@Module({
  imports: [
    StorageModule,
  ],
  providers: [TakeScreenshotHandler
  ],
})
export class TakeScreenshotModule { }
