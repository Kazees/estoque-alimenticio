import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TransacoesProdutoLoteEntity } from "@app/domain/main/transacoes/transacoesProdutoLote.entity";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export class TransacoesProdutoLoteRepository {
    constructor(
        @InjectRepository(TransacoesProdutoLoteEntity)
        private readonly repository: Repository<TransacoesProdutoLoteEntity>
    ) {}

    async save(transacaoId: number, produtoId: number, loteId: number, quantidade: number, manager?: EntityManager): Promise<TransacoesProdutoLoteEntity> {
        const repo = manager ? manager.getRepository(TransacoesProdutoLoteEntity) : this.repository;
        return repo.save({ transacaoId, produtoId, loteId, quantidade });
    }
}