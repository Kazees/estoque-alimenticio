import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoteEntity } from "@app/domain/main/lote/lote.entity";
import { FornecedorEntity } from "@app/domain/main/fornecedor/fornecedor.entity";
import { ProdutoLoteEntity } from "@app/domain/main/produto/produtoLote.entity";
import { LoteController } from "@app/domain/main/lote/lote.controller";
import { LoteService } from "@app/domain/main/lote/lote.service";
import { LoteRepository } from "@app/domain/main/lote/lote.repository";
import { FornecedorRepository } from "@app/domain/main/fornecedor/fornecedor.repository";
import { LocalizacaoModule } from "@app/domain/main/localizacao/localizacao.module";
import { ProdutoLoteRepository } from "@app/domain/main/produto/produtoLote.repository";
import { ProdutoLoteService } from "@app/domain/main/produto/produtoLote.service";

@Module({
    imports: [TypeOrmModule.forFeature([LoteEntity, FornecedorEntity, ProdutoLoteEntity]), LocalizacaoModule],
    controllers: [LoteController],
    providers: [LoteService, LoteRepository, FornecedorRepository, ProdutoLoteRepository, ProdutoLoteService],
    exports: [LoteService, LoteRepository, FornecedorRepository, ProdutoLoteRepository, ProdutoLoteService]
})
export class LoteModule {}