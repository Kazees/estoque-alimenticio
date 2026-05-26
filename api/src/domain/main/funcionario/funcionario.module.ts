import { Module } from "@nestjs/common";
import { FuncionarioEntity } from "./funcionario.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FuncionarioController } from "@app/domain/main/funcionario/funcionario.controller";
import { FuncionarioRepository } from "@app/domain/main/funcionario/funcionario.repository";
import { FuncionarioService } from "@app/domain/main/funcionario/funcionario.service";
import { ContatoEntity } from "@app/domain/main/contato/contato.entity";
import { ContatoRepository } from "@app/domain/main/contato/contato.repository";
import { EnderecoModule } from "@app/domain/main/endereco/endereco.module";

@Module({
    imports: [TypeOrmModule.forFeature([FuncionarioEntity, ContatoEntity]), EnderecoModule],
    controllers: [FuncionarioController],
    providers: [FuncionarioRepository, FuncionarioService, ContatoRepository],
    exports: [FuncionarioService, FuncionarioRepository]
})
export class FuncionarioModule {}
