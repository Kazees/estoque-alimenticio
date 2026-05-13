import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableTransacaoProdutoLote1778599756551 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "_TransacaoProdutoLote" (
                "transacaoId" INTEGER NOT NULL,
                "produtoId" INTEGER NOT NULL,
                "loteId" INTEGER NOT NULL,
                "quantidade" INTEGER NOT NULL,

                PRIMARY KEY ("transacaoId", "produtoId", "loteId"),
                FOREIGN KEY ("transacaoId") REFERENCES "Transacoes" ("id"),
                FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id"),
                FOREIGN KEY ("loteId") REFERENCES "Lote" ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "_TransacaoProdutoLote";`);
    }

}
