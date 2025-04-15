import { MigrationInterface, QueryRunner } from "typeorm";

export class CouponDetails1743828972968 implements MigrationInterface {
    name = 'CouponDetails1743828972968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "coupon_details" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "affiliateId" character varying NOT NULL, "productHandle" character varying NOT NULL, "visits" integer NOT NULL, "purchases" integer NOT NULL, "amount" double precision NOT NULL, "orderIds" text NOT NULL, CONSTRAINT "PK_1405ae747a031673ac3514bae45" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "coupon_details"`);
    }

}
