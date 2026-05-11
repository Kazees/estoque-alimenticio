import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableLocalizacao1778522397215 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "Localizacao" (
                "id" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
                "corredores" VARCHAR(10) NOT NULL,
                "prateleiras" VARCHAR(10) NOT NULL
                "seccoes" VARCHAR(10) NOT NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "Localizacao";`);
    }
}
