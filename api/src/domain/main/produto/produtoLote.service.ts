import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { ProdutoLoteRepository } from "@app/domain/main/produto/produtoLote.repository";
import { ProdutoLoteEntity } from "@app/domain/main/produto/produtoLote.entity";

@Injectable()
export class ProdutoLoteService {
    constructor(
        private readonly produtoLoteRepository: ProdutoLoteRepository,
    ) {}

    async find(produtoId: number, loteId: number): Promise<ProdutoLoteEntity | null> {
        return this.produtoLoteRepository.find(produtoId, loteId);
    }

    async updateQuantidade(produtoId: number, loteId: number, quantidade: number, manager?: EntityManager): Promise<void> {
        await this.produtoLoteRepository.updateQuantidade(produtoId, loteId, quantidade, manager);
    }
}
