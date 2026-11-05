import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOutboxMessage1793267228688 implements MigrationInterface {
  name = 'CreateOutboxMessage1793267228688';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "outbox_message" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying NOT NULL, "message" jsonb NOT NULL, "status" character varying NOT NULL, CONSTRAINT "UQ_outbox_message_uuid" UNIQUE ("uuid"), CONSTRAINT "PK_outbox_message_id" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "outbox_message"`);
  }
}
