import { Module } from "@nestjs/common";
import { StorageModule } from "src/infrastructure/in-memory-storage/storage.module";
import { BuyOrderHandler } from "./buy-order.handler";
import { BuyOrderController } from "./buy-order.controller";
import { RedisModule } from "src/infrastructure/redis/redis.module";

@Module({
  imports: [StorageModule, RedisModule],
  controllers: [BuyOrderController],
  providers: [BuyOrderHandler],
})
export class BuyOrderModule {}