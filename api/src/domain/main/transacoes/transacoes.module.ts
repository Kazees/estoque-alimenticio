import { Module } from "@nestjs/common";
import { TransacoesEntity } from "@app/domain/main/transacoes/transacoes.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransacoesController } from "@app/domain/main/transacoes/transacoes.controller";
import { TransacoesProdutoLoteRepository } from "@app/domain/main/transacoes/transacoesProdutoLote.repository";
import { TransacoesRepository } from "@app/domain/main/transacoes/transacoes.repository";
import { TransacoesService } from "@app/domain/main/transacoes/transacoes.service";
import { TransacoesProdutoLoteService } from "@app/domain/main/transacoes/transacoesProdutoLote.service";
import { TransacoesProdutoLoteEntity } from "@app/domain/main/transacoes/transacoesProdutoLote.entity";
import { LoteModule } from "@app/domain/main/lote/lote.module";

@Module({
    imports: [TypeOrmModule.forFeature([TransacoesEntity, TransacoesProdutoLoteEntity]), LoteModule],
    controllers: [TransacoesController],
    providers: [TransacoesController, TransacoesService, TransacoesRepository, TransacoesProdutoLoteRepository, TransacoesProdutoLoteService],
    exports: [TransacoesService, TransacoesRepository]
})
export class TransacoesModule {}