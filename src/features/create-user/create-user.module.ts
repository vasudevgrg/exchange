import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/domain/user.entity";
import { StorageModule } from "src/infrastructure/in-memory-storage/storage.module";
import { CreateUserHandler } from "./create-user.handler";
import { CreateUserController } from "./create-user.controller";

@Module({
    imports: [StorageModule,TypeOrmModule.forFeature([User])],
    providers: [CreateUserHandler],
    controllers: [CreateUserController]
})
export class CreateUserModule {}