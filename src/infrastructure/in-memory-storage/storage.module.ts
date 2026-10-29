import { Module } from "@nestjs/common";
import { StorageHandler } from "./storage.handler";

@Module({
  imports: [],
  controllers: [],
  providers: [StorageHandler],
})
export class StorageModule {}