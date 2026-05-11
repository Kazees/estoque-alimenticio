"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertAdminFuncionario1778256934214 = void 0;
class InsertAdminFuncionario1778256934214 {
    async up(queryRunner) {
        await queryRunner.query(`
            INSERT INTO "Contato" ("codigo_pais", "ddd", "numero")
            VALUES ('55', '62', '999999999');
        `);
        await queryRunner.query(`
            INSERT INTO "Endereco" ("logradouro", "numero", "cep", "bairroId")
            VALUES ('Rua 1', 1, '99999999', 1);
        `);
        await queryRunner.query(`
            INSERT INTO "Funcionario" ("name", "email", "password", "role", "contatoId", "enderecoId")
            VALUES ('Admin', 'admin@gmail.com', '$2b$10$rMX79252jwf6tdNfMH8V1u52.6Q5MfaqPEegGlyzUUqKB6Nqvf8Ze', 'ADMIN', 1, 1);
        `);
    }
    async down(queryRunner) { }
}
exports.InsertAdminFuncionario1778256934214 = InsertAdminFuncionario1778256934214;
//# sourceMappingURL=1778256934214-InsertAdminFuncionario.js.map