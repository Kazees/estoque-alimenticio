import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { TransacoesProdutoLoteRepository } from "@app/domain/main/transacoes/transacoesProdutoLote.repository";
import { TransacoesProdutoLoteEntity } from "@app/domain/main/transacoes/transacoesProdutoLote.entity";

@Injectable()
export class TransacoesProdutoLoteService {
    constructor(
        private readonly transacoesProdutoLoteRepository: TransacoesProdutoLoteRepository,
    ) {}

    async save(transacaoId: number, produtoId: number, loteId: number, quantidade: number, manager?: EntityManager): Promise<TransacoesProdutoLoteEntity> {
        return this.transacoesProdutoLoteRepository.save(transacaoId, produtoId, loteId, quantidade, manager);
    }
}
