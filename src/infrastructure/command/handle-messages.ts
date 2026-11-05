import { Command, CommandRunner } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { RedisManager } from '../redis/redis-manager';
import { SignatureTypes } from '../processor/signatures-types.handler';

@Command({ name: 'handle-messages' })
export class HandleMessagesCommand extends CommandRunner {
  private readonly logger = new Logger(HandleMessagesCommand.name);

  constructor(
    private readonly redisManager: RedisManager,
    private readonly signatureTypes: SignatureTypes,
  ) {
    super();
  }

  async run(): Promise<void> {
    this.logger.log('Waiting for a Redis message');
    const { message, channel } = await this.redisManager.consumeMessages();
    this.logger.log(`Received a message on channel "${channel}"`);
    const processor = this.signatureTypes.signatureTypes[channel];

    if (!processor) {
      throw new Error(`No message processor registered for channel "${channel}"`);
    }

    await processor.handleEvent(JSON.parse(message));
  }
}