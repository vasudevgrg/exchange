import { Module } from "@nestjs/common";
import { StorageHandler } from "./storage.handler";

@Module({
  exports: [StorageHandler],
  controllers: [],
  providers: [StorageHandler],
})
export class StorageModule {}