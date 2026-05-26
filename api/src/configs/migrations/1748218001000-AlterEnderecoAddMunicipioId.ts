import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterEnderecoAddMunicipioId1748218001000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Endereco" ADD COLUMN IF NOT EXISTS "municipioId" INTEGER REFERENCES "Municipio"("id");`);
        await queryRunner.query(`
            UPDATE "Endereco" e
            SET "municipioId" = b."municipioId"
            FROM "Bairro" b
            WHERE e."bairroId" = b.id AND e."municipioId" IS NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Endereco" DROP COLUMN IF EXISTS "municipioId";`);
    }
}
