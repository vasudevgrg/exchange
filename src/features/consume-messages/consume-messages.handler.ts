import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OutboxMessage } from '../../domain/outbox-message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConsumeMessagesHandler {
  constructor(
    @InjectRepository(OutboxMessage)
    private readonly outboxMessageRepository: Repository<OutboxMessage>,
  ) {}

  async handle(limit: number = 10): Promise<OutboxMessage[]> {
    if (!Number.isSafeInteger(limit) || limit <= 0) {
      throw new BadRequestException('Limit must be a positive integer');
    }

    return this.outboxMessageRepository.find({
      where: { status: 'pending' },
      order: { created_at: 'ASC' },
      take: limit,
    });
  }
}
