import { Module } from '@nestjs/common';
import { CommandFactory } from 'nest-commander';
import { DispatchMessagesModule } from './dispatch-messages.module';
import { HandleMessagesModule } from './handle-messages.module';
import { TakeScreenshotModule } from './take-screenshot.module';

@Module({
  imports: [DispatchMessagesModule, HandleMessagesModule, TakeScreenshotModule],
})
export class CommandModule {}

async function bootstrap(): Promise<void> {
  await CommandFactory.run(CommandModule, ['log', 'error', 'warn']);
}

void bootstrap();