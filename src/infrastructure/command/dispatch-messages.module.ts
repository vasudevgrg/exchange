import { Module } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { ConsumeMessagesModule } from '../../features/consume-messages/consume-messages.module';
import { RedisModule } from '../redis/redis.module';
import { DispatchmMessages } from './dispatch-messages';

@Module({
  imports: [AppModule, ConsumeMessagesModule, RedisModule],
  providers: [DispatchmMessages],
})
export class DispatchMessagesModule {}
