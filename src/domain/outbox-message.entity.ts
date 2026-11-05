import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('outbox_message')
export class OutboxMessage extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  type: string;

  @Column({ type: 'jsonb', nullable: false })
  message: Record<any, any>;

  @Column({ type: 'varchar', nullable: false })
  status: string;
}