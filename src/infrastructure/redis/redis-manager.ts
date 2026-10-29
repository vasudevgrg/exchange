import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { createClient } from 'redis';

type NotificationMessage = {
  organization_uuid: string;
  notification_uuid: string;
  user_uuid: string;
};

type NotificationHandler = (
  organizationUuid: string,
  notificationUuid: string,
  userUuid: string,
) => void | Promise<void>;

@Injectable()
export class RedisManager implements OnModuleDestroy {
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
      console.error('Redis client error:', error);
    });
    this.subscriber.on('error', (error) => {
      console.error('Redis subscriber error:', error);
    });
  }

  async publishMessage(channel: string, message: unknown): Promise<void> {
    await this.connect();
    await this.client.publish(channel, JSON.stringify(message));
  }

  async consumeMessages(
    pattern: string = '*',
    handler: NotificationHandler,
  ): Promise<void> {
    await this.connect();
    await this.subscriber.pSubscribe(pattern, async (message, channel) => {
      if (channel !== 'notification_events') {
        return;
      }

      try {
        const notification = JSON.parse(message) as Partial<NotificationMessage>;
        if (
          typeof notification.organization_uuid !== 'string' ||
          typeof notification.notification_uuid !== 'string' ||
          typeof notification.user_uuid !== 'string'
        ) {
          throw new Error('Invalid notification message');
        }

        await handler(
          notification.organization_uuid,
          notification.notification_uuid,
          notification.user_uuid,
        );
      } catch (error) {
        console.error('Failed to process Redis notification:', error);
      }
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
