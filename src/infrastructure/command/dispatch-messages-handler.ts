import { CommandFactory } from 'nest-commander';
import { DispatchMessagesModule } from './dispatch-messages.module';

async function bootstrap(): Promise<void> {
  await CommandFactory.run(DispatchMessagesModule, ['log', 'error', 'warn']);
}

void bootstrap();
