import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConditionToData1722067524420 implements MigrationInterface {
    name = 'AddConditionToData1722067524420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data" ADD "condition" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data" DROP COLUMN "condition"`);
    }

}
