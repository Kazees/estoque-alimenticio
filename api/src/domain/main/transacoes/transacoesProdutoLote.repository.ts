import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TransacoesProdutoLoteEntity } from "@app/domain/main/transacoes/transacoesProdutoLote.entity";
import { Repository } from "typeorm";

@Injectable()
export class TransacoesProdutoLoteRepository {
    constructor(
        @InjectRepository(TransacoesProdutoLoteEntity) 
        private readonly repository: Repository<TransacoesProdutoLoteEntity>
    ) {}

    async save(transacaoId: number, produtoId: number, loteId: number, quantidade: number): Promise<TransacoesProdutoLoteEntity> {
        return await this.repository.save({ transacaoId, produtoId, loteId, quantidade });
    }
}