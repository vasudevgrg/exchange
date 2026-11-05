import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisManager implements OnModuleDestroy {
  private readonly logger = new Logger(RedisManager.name);
  private readonly client: ReturnType<typeof createClient>;
  private readonly subscriber: ReturnType<typeof createClient>;
  private connection: Promise<void> | undefined;

  constructor() {
    const clientConfig = {
      socket: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: Number.parseInt(process.env.REDIS_PORT ?? '6379', 10),
      },
      password: process.env.REDIS_PASSWORD,
    };

    this.client = createClient(clientConfig);
    this.subscriber = createClient(clientConfig);

    this.client.on('error', (error) => {
      this.logger.error('Redis client error', error);
    });
    this.subscriber.on('error', (error) => {
      this.logger.error('Redis subscriber error', error);
    });
  }

  async publishMessage(channel: string, message: unknown): Promise<void> {
    await this.connect();
    await this.client.publish(channel, JSON.stringify(message));
  }

  async consumeMessages(
    pattern: string = '*'
  ): Promise<{ message: any; channel: string }> {
    await this.connect();

    return new Promise((resolve, reject) => {
      this.subscriber.pSubscribe(pattern, (message, channel) => {
        resolve({ message, channel });
      }).catch(reject);
    });
  }

  private async connect(): Promise<void> {
    if (!this.connection) {
      this.connection = Promise.all([
        this.client.connect(),
        this.subscriber.connect(),
      ])
        .then(() => undefined)
        .catch((error: unknown) => {
          this.connection = undefined;
          throw error;
        });
    }

    await this.connection;
  }

  async onModuleDestroy(): Promise<void> {
    await Promise.all([
      this.client.isOpen ? this.client.quit() : Promise.resolve(),
      this.subscriber.isOpen ? this.subscriber.quit() : Promise.resolve(),
    ]);
  }
}
