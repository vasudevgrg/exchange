import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1793267228687 implements MigrationInterface {
    name = 'Migration1793267228687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trade" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "market_id" integer NOT NULL, "quantity" numeric(20,8) NOT NULL, "price" numeric(20,8) NOT NULL, "sell_order_ids" integer array NOT NULL DEFAULT '{}', "buy_order_ids" integer array NOT NULL DEFAULT '{}', CONSTRAINT "UQ_bcca2077d1ecce9a10a907b4bb5" UNIQUE ("uuid"), CONSTRAINT "PK_d4097908741dc408f8274ebdc53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "balance" numeric(20,8) NOT NULL DEFAULT '0', CONSTRAINT "UQ_a95e949168be7b7ece1a2382fed" UNIQUE ("uuid"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "market_id" integer NOT NULL, "quantity" numeric(20,8) NOT NULL, "fulfilled_quantity" numeric(20,8) NOT NULL DEFAULT '0', CONSTRAINT "UQ_ba94d4066f76b66d3fe0b94c283" UNIQUE ("uuid"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "market" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "UQ_ff4126341cc558b02777e8e12a8" UNIQUE ("uuid"), CONSTRAINT "PK_1e9a2963edfd331d92018e3abac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trade_buy_orders" ("tradeId" integer NOT NULL, "orderId" integer NOT NULL, CONSTRAINT "PK_39f69c4737dfb1c7b0cd9b66684" PRIMARY KEY ("tradeId", "orderId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_98c7829903e0b75895c6c19acb" ON "trade_buy_orders"  ("tradeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fa64019c78b25753c710b30762" ON "trade_buy_orders"  ("orderId") `);
        await queryRunner.query(`CREATE TABLE "trade_sell_orders" ("tradeId" integer NOT NULL, "orderId" integer NOT NULL, CONSTRAINT "PK_160973c4f1df93aa113b75b8584" PRIMARY KEY ("tradeId", "orderId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a85b2f38b097be5123064785d3" ON "trade_sell_orders"  ("tradeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_42c874883a5462473f645454c7" ON "trade_sell_orders"  ("orderId") `);
        await queryRunner.query(`ALTER TABLE "trade" ADD CONSTRAINT "FK_feeaee6c44821a3b81cd1c114b5" FOREIGN KEY ("market_id") REFERENCES "market"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_d91cc35ada00c918781b7f0599d" FOREIGN KEY ("market_id") REFERENCES "market"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trade_buy_orders" ADD CONSTRAINT "FK_98c7829903e0b75895c6c19acb4" FOREIGN KEY ("tradeId") REFERENCES "trade"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "trade_buy_orders" ADD CONSTRAINT "FK_fa64019c78b25753c710b30762f" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "trade_sell_orders" ADD CONSTRAINT "FK_a85b2f38b097be5123064785d39" FOREIGN KEY ("tradeId") REFERENCES "trade"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "trade_sell_orders" ADD CONSTRAINT "FK_42c874883a5462473f645454c79" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trade_sell_orders" DROP CONSTRAINT "FK_42c874883a5462473f645454c79"`);
        await queryRunner.query(`ALTER TABLE "trade_sell_orders" DROP CONSTRAINT "FK_a85b2f38b097be5123064785d39"`);
        await queryRunner.query(`ALTER TABLE "trade_buy_orders" DROP CONSTRAINT "FK_fa64019c78b25753c710b30762f"`);
        await queryRunner.query(`ALTER TABLE "trade_buy_orders" DROP CONSTRAINT "FK_98c7829903e0b75895c6c19acb4"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_d91cc35ada00c918781b7f0599d"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
        await queryRunner.query(`ALTER TABLE "trade" DROP CONSTRAINT "FK_feeaee6c44821a3b81cd1c114b5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_42c874883a5462473f645454c7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a85b2f38b097be5123064785d3"`);
        await queryRunner.query(`DROP TABLE "trade_sell_orders"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fa64019c78b25753c710b30762"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_98c7829903e0b75895c6c19acb"`);
        await queryRunner.query(`DROP TABLE "trade_buy_orders"`);
        await queryRunner.query(`DROP TABLE "market"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "trade"`);
    }

}
