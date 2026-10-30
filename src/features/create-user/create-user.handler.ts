import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomUUID } from "node:crypto";
import { User } from "src/domain/user.entity";
import { StorageHandler } from "src/infrastructure/in-memory-storage/storage.handler";
import { Repository } from "typeorm";

@Injectable()
export class CreateUserHandler {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly storageHandler : StorageHandler
    )
     {}

    async handle (payload) {
        const {name, email, balance, password, uuid=randomUUID()} = payload;


        await this.userRepository.save({uuid, name, email, balance, password});

        this.storageHandler.addUser({
            uuid, balance
        })


    }
}