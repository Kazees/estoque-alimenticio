import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterEnderecoMakeBairroIdNullable1778677925201 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Endereco" ALTER COLUMN "bairroId" DROP NOT NULL;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Endereco" ALTER COLUMN "bairroId" SET NOT NULL;`);
    }
}
