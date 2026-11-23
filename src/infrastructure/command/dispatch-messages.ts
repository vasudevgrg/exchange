import { Command, CommandRunner } from "nest-commander";
import { ConsumeMessagesHandler } from "src/features/consume-messages/consume-messages.handler";
import { RedisManager } from "../redis/redis-manager";

@Command({ name: 'dispatch-messages' })
export class DispatchmMessages extends CommandRunner {
  constructor(
    private readonly handler: ConsumeMessagesHandler,
    private readonly redisManager: RedisManager,
  ) {
    super();
  }

  async run(): Promise<void> {
    const messages = await this.handler.handle();

    for (const message of messages) {
      await this.redisManager.publishMessage(message.type, message.message);
    }
  }
}