import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoLoteEntity } from "@app/domain/main/produto/produtoLote.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProdutoLoteRepository {
    constructor(
        @InjectRepository(ProdutoLoteEntity) 
        private readonly repository: Repository<ProdutoLoteEntity>
    ) {}

    async save(produtoId: number, loteId: number, quantidade: number): Promise<ProdutoLoteEntity> {
        return this.repository.save({ produtoId, loteId, quantidade });
    }

    async updateQuantidade(produtoId: number, loteId: number, quantidade: number) {
        await this.repository.update({ 
            produtoId, 
            loteId 
        }, { 
            quantidade 
        }); 
    }

    async find (produtoId: number, loteId: number): Promise<ProdutoLoteEntity | null> {
        return this.repository.findOne({ 
            where: { 
                produtoId, 
                loteId 
            } 
        }); 
    }
}