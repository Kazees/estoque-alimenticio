import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { TransacoesProdutoLoteRepository } from "./transacoesProdutoLote.repository";
import { ProdutoLoteRepository } from "@app/domain/main/produto/produtoLote.repository";
import { TransacoesInput } from "@app/domain/main/transacoes/transacoes.input";
import { TransacoesEntity } from "@app/domain/main/transacoes/transacoes.entity";
import { TransacaoEnum } from "@app/domain/shared/enums/transacao.enum";
import { TransacoesRepository } from "@app/domain/main/transacoes/transacoes.repository";
import { TransacoesFilter } from "@app/domain/main/transacoes/transacoes.filter";

@Injectable()
export class TransacoesService {
    constructor(
        private readonly transacoesRepository: TransacoesRepository,
        private readonly transacoesProdutoLoteRepository: TransacoesProdutoLoteRepository,
        private readonly produtoLoteRepository: ProdutoLoteRepository,

    ) {}

    async save(input: TransacoesInput, funcionarioId: number): Promise<TransacoesEntity> {
        const produtoLote = await this.produtoLoteRepository.find(input.produtoId, input.loteId);
        if (!produtoLote) throw new NotFoundException('Produto e Lote não encontrados.');

        if (input.tipo === TransacaoEnum.SAIDA && produtoLote.quantidade < input.quantidade) throw new BadRequestException('Quantidade insuficiente.');
        const transacao = await this.transacoesRepository.save(TransacoesEntity.of(input, funcionarioId));

        await this.transacoesProdutoLoteRepository.save(transacao.id, input.produtoId, input.loteId, input.quantidade);
        const novaQuantidade = input.tipo === TransacaoEnum.ENTRADA ? produtoLote.quantidade + input.quantidade : produtoLote.quantidade - input.quantidade;
        await this.produtoLoteRepository.updateQuantidade(input.produtoId, input.loteId, novaQuantidade);

        return this.transacoesRepository.findById(transacao.id) as Promise<TransacoesEntity>;
    }

    async list(filter?: TransacoesFilter): Promise<TransacoesEntity[]> {
        return this.transacoesRepository.find(filter);
    }
}