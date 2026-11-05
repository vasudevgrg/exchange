import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutboxMessage } from '../../domain/outbox-message.entity';
import { ConsumeMessagesHandler } from './consume-messages.handler';

@Module({
  imports: [TypeOrmModule.forFeature([OutboxMessage])],
  providers: [ConsumeMessagesHandler],
  exports: [ConsumeMessagesHandler],
})
export class ConsumeMessagesModule {}
