import { Module } from "@nestjs/common";
import { StorageModule } from "src/infrastructure/in-memory-storage/storage.module";

@Module({
  imports: [StorageModule],
  controllers: [],
  providers: [],
})
export class BuyOrderModule {}