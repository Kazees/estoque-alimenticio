import { Module } from "@nestjs/common";
import { TransacoesEntity } from "@app/domain/main/transacoes/transacoes.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransacoesController } from "@app/domain/main/transacoes/transacoes.controller";
import { ProdutoLoteRepository } from "@app/domain/main/produto/produtoLote.repository";
import { TransacoesProdutoLoteRepository } from "@app/domain/main/transacoes/transacoesProdutoLote.repository";
import { TransacoesRepository } from "@app/domain/main/transacoes/transacoes.repository";
import { TransacoesService } from "@app/domain/main/transacoes/transacoes.service";
import { TransacoesProdutoLoteEntity } from "@app/domain/main/transacoes/transacoesProdutoLote.entity";
import { ProdutoLoteEntity } from "@app/domain/main/produto/produtoLote.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TransacoesEntity, TransacoesProdutoLoteEntity, ProdutoLoteEntity])],
    controllers: [TransacoesController],
    providers: [TransacoesController, TransacoesService, TransacoesRepository, TransacoesProdutoLoteRepository, ProdutoLoteRepository],
    exports: [TransacoesService, TransacoesRepository]
})
export class TransacoesModule {}