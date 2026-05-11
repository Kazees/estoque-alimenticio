import { AuthModule } from "@app/domain/auth/auth.module";
import { forwardRef, Module } from "@nestjs/common";
import { FuncionarioAdminController } from "@app/domain/admin/funcionario/funcionario.admin.controller";
import { FuncionarioAdminService } from "@app/domain/admin/funcionario/funcionario.admin.service";
import { FuncionarioAdminRepository } from "@app/domain/admin/funcionario/funcionario.admin.repository";
import { ContatoRepository } from "@app/domain/main/contato/contato.repository";
import { EnderecoRepository } from "@app/domain/main/endereco/endereco.repository";
import { CryptoService } from "@app/domain/auth/crypto.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FuncionarioEntity } from "@app/domain/main/funcionario/funcionario.entity";
import { ContatoEntity } from "@app/domain/main/contato/contato.entity";
import { EnderecoEntity } from "@app/domain/main/endereco/endereco.entity";

@Module({
    imports: [TypeOrmModule.forFeature([FuncionarioEntity, ContatoEntity, EnderecoEntity]), forwardRef(() => AuthModule)],
    controllers: [FuncionarioAdminController],
    providers: [FuncionarioAdminService, FuncionarioAdminRepository, ContatoRepository, EnderecoRepository, CryptoService],
    exports: [FuncionarioAdminService, FuncionarioAdminRepository]
})

export class FuncionarioAdminModule {}