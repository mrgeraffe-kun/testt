import { MigrationInterface, QueryRunner } from "typeorm";

export class CouponDetailsCreate1745124245032 implements MigrationInterface {
    name = 'CouponDetailsCreate1745124245032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon_details" ADD "amounts" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon_details" DROP COLUMN "amounts"`);
    }

}
