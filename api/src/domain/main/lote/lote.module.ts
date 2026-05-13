import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoteEntity } from "@app/domain/main/lote/lote.entity";
import { FornecedorEntity } from "@app/domain/main/fornecedor/fornecedor.entity";
import { LocalizacaoEntity } from "@app/domain/main/localizacao/localizacao.entity";
import { ProdutoLoteEntity } from "@app/domain/main/produto/produtoLote.entity";
import { LoteController } from "@app/domain/main/lote/lote.controller";
import { LoteService } from "@app/domain/main/lote/lote.service";
import { LoteRepository } from "@app/domain/main/lote/lote.repository";
import { FornecedorRepository } from "@app/domain/main/fornecedor/fornecedor.repository";
import { LocalizacaoRepository } from "@app/domain/main/localizacao/localizacao.repository";
import { ProdutoLoteRepository } from "@app/domain/main/produto/produtoLote.repository";

@Module({
    imports: [TypeOrmModule.forFeature([LoteEntity, FornecedorEntity, LocalizacaoEntity, ProdutoLoteEntity])],
    controllers: [LoteController],
    providers: [LoteController, LoteService, LoteRepository, FornecedorRepository, LocalizacaoRepository, ProdutoLoteRepository],
    exports: [LoteService, LoteRepository, FornecedorRepository, LocalizacaoRepository, ProdutoLoteRepository ]
})
export class LoteModule {}