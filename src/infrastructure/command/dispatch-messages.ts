import { Command, CommandRunner } from "nest-commander";
import { ConsumeMessagesHandler } from "src/features/consume-messages/consume-messages.handler";
import { RedisManager } from "../redis/redis-manager";

@Command({name:'dispatch-messages'})
export class DispatchmMessages extends CommandRunner {

    constructor(private readonly handler: ConsumeMessagesHandler, private readonly redisManager: RedisManager) {
        super()
    }


    async run () {
        const messages =await  this.handler.handle();

        for(const m of messages) {
            const {type, message} = m;

            await this.redisManager.publishMessage(type, message);
        }


    }
}