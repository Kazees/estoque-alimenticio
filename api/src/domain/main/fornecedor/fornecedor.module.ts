import { FornecedorEntity } from "./fornecedor.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContatoEntity } from "../contato/contato.entity";
import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "@app/domain/auth/auth.module";
import { ContatoRepository } from "@app/domain/main/contato/contato.repository";
import { FornecedorController } from "@app/domain/main/fornecedor/fornecedor.controller";
import { FornecedorService } from "@app/domain/main/fornecedor/fornecedor.service";
import { FornecedorRepository } from "@app/domain/main/fornecedor/fornecedor.repository";
import { EnderecoModule } from "@app/domain/main/endereco/endereco.module";

@Module({
    imports: [TypeOrmModule.forFeature([FornecedorEntity, ContatoEntity]), forwardRef(() => AuthModule), EnderecoModule],
    controllers: [FornecedorController],
    providers: [FornecedorService, FornecedorRepository, ContatoRepository],
    exports: [FornecedorService, FornecedorRepository]
})
export class FornecedorModule {}
