import { MigrationInterface, QueryRunner } from "typeorm";

export class AffiliateCreate1741514586022 implements MigrationInterface {
    name = 'AffiliateCreate1741514586022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "affiliates" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "email" character varying NOT NULL, CONSTRAINT "PK_5458bf988fb83086da3a14b9ff9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "affiliates"`);
    }

}
