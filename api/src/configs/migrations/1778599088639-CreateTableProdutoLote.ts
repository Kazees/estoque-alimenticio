import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableProdutoLote1778599088639 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "_ProdutoLote" (
                "produtoId" INTEGER NOT NULL,
                "loteId" INTEGER NOT NULL,
                "quantidade" INTEGER NOT NULL,

                PRIMARY KEY ("produtoId", "loteId"),
                FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id"),
                FOREIGN KEY ("loteId") REFERENCES "Lote" ("id")
            )    
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "_ProdutoLote";`);
    }
}
