import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { TransacoesProdutoLoteService } from "@app/domain/main/transacoes/transacoesProdutoLote.service";
import { ProdutoLoteService } from "@app/domain/main/produto/produtoLote.service";
import { TransacoesInput } from "@app/domain/main/transacoes/transacoes.input";
import { TransacoesEntity } from "@app/domain/main/transacoes/transacoes.entity";
import { TransacaoEnum } from "@app/domain/shared/enums/transacao.enum";
import { TransacoesRepository } from "@app/domain/main/transacoes/transacoes.repository";
import { TransacoesFilter } from "@app/domain/main/transacoes/transacoes.filter";

@Injectable()
export class TransacoesService {
    constructor(
        private readonly transacoesRepository: TransacoesRepository,
        private readonly transacoesProdutoLoteService: TransacoesProdutoLoteService,
        private readonly produtoLoteService: ProdutoLoteService,
        private readonly dataSource: DataSource,
    ) {}

    async save(input: TransacoesInput, funcionarioId: number): Promise<TransacoesEntity> {
        const produtoLote = await this.produtoLoteService.find(input.produtoId, input.loteId);
        if (!produtoLote) throw new NotFoundException('Produto e Lote não encontrados.');

        if (input.tipo === TransacaoEnum.SAIDA && produtoLote.quantidade < input.quantidade)
            throw new BadRequestException('Quantidade insuficiente.');

        const novaQuantidade = input.tipo === TransacaoEnum.ENTRADA
            ? produtoLote.quantidade + input.quantidade
            : produtoLote.quantidade - input.quantidade;

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const transacao = await this.transacoesRepository.save(TransacoesEntity.of(input, funcionarioId), queryRunner.manager);
            await this.transacoesProdutoLoteService.save(transacao.id, input.produtoId, input.loteId, input.quantidade, queryRunner.manager);
            await this.produtoLoteService.updateQuantidade(input.produtoId, input.loteId, novaQuantidade, queryRunner.manager);
            await queryRunner.commitTransaction();
            return this.transacoesRepository.findById(transacao.id) as Promise<TransacoesEntity>;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async list(filter?: TransacoesFilter): Promise<TransacoesEntity[]> {
        return this.transacoesRepository.find(filter);
    }
}