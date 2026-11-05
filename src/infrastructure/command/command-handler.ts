import { CommandFactory } from 'nest-commander';
import { HandleMessagesModule } from './handle-messages.module';

async function bootstrap(): Promise<void> {
  await CommandFactory.run(HandleMessagesModule, ['log', 'error', 'warn']);
}

void bootstrap();