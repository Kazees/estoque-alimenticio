import { FornecedorEntity } from "./fornecedor.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContatoEntity } from "../contato/contato.entity";
import { EnderecoEntity } from "../endereco/endereco.entity";
import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "@app/domain/auth/auth.module";
import { ContatoRepository } from "@app/domain/main/contato/contato.repository";
import { EnderecoRepository } from "@app/domain/main/endereco/endereco.repository";
import { FornecedorController } from "@app/domain/main/fornecedor/fornecedor.controller";
import { FornecedorService } from "@app/domain/main/fornecedor/fornecedor.service";
import { FornecedorRepository } from "@app/domain/main/fornecedor/fornecedor.repository";

@Module({
    imports: [TypeOrmModule.forFeature([FornecedorEntity, ContatoEntity, EnderecoEntity]), forwardRef(() => AuthModule)],
    controllers: [FornecedorController],
    providers: [FornecedorService, FornecedorRepository, ContatoRepository, EnderecoRepository],
    exports: [FornecedorService, FornecedorRepository]
})
export class FornecedorModule {}