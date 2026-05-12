import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoEntity } from "@app/domain/main/produto/produto.entity";
import { ProdutoLoteEntity } from "@app/domain/main/produto/produtoLote.entity";
import { LoteEntity } from "@app/domain/main/lote/lote.entity";
import { ProdutoController } from "@app/domain/main/produto/produto.controller";
import { ProdutoService } from "@app/domain/main/produto/produto.service";
import { InformacoesNutricionaisRepository } from "@app/domain/main/informacoes_nutricionais/informacoesNutricionais.repository";
import { ProdutoRepository } from "@app/domain/main/produto/produto.repository";
import { InformacoesNutricionaisEntity } from "@app/domain/main/informacoes_nutricionais/informacoesNutricionais.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProdutoEntity, ProdutoLoteEntity, LoteEntity, InformacoesNutricionaisEntity])],
    controllers: [ProdutoController],
    providers: [ProdutoController, ProdutoService, ProdutoRepository, InformacoesNutricionaisRepository],
    exports: [ProdutoService, ProdutoRepository]
})
export class ProdutoModule {}
