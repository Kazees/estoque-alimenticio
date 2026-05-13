import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertValuesLocalizacao1778677925200 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "Localizacao" ("corredores", "prateleiras", "seccoes") VALUES ('A', '1', 'S1');
            INSERT INTO "Localizacao" ("corredores", "prateleiras", "seccoes") VALUES ('A', '2', 'S1');
            INSERT INTO "Localizacao" ("corredores", "prateleiras", "seccoes") VALUES ('A', '3', 'S1');
            INSERT INTO "Localizacao" ("corredores", "prateleiras", "seccoes") VALUES ('B', '1', 'S2');
            INSERT INTO "Localizacao" ("corredores", "prateleiras", "seccoes") VALUES ('B', '2', 'S2');
            INSERT INTO "Localizacao" ("corredores", "prateleiras", "seccoes") VALUES ('B', '3', 'S2');
            INSERT INTO "Localizacao" ("corredores", "prateleiras", "seccoes") VALUES ('C', '1', 'S3');
            INSERT INTO "Localizacao" ("corredores", "prateleiras", "seccoes") VALUES ('C', '2', 'S3');
            INSERT INTO "Localizacao" ("corredores", "prateleiras", "seccoes") VALUES ('C', '3', 'S3');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
