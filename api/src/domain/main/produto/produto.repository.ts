import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "@app/domain/main/produto/produto.entity";
import { Repository, UpdateResult } from "typeorm";
import { ProdutoInput } from "./produto.input";
import { ProdutoFilter } from "./produto.filter";

@Injectable()
export class ProdutoRepository {
    constructor(
        @InjectRepository(ProdutoEntity) 
        private readonly repository: Repository<ProdutoEntity>
    ) {}

    async save(produto: ProdutoInput): Promise<ProdutoEntity> {
        return this.repository.save(produto);
    }

    async list(filter?: ProdutoFilter): Promise<ProdutoEntity[]> {
        const db = this.repository
            .createQueryBuilder('produto')
            .leftJoinAndSelect('produto.lote', 'produto_lote')
            .leftJoinAndSelect('produto_lote.lote', 'lote')
            .where('produto.active = :active', { active: true });

            if (filter?.name) db.andWhere('produto.name LIKE :name', { name: `%${filter.name}%` });

            if (filter?.active) db.andWhere('produto.active = :active', { active: filter.active });

            if (filter?.precoMin) db.andWhere('produto.preco >= :precoMin', { precoMin: filter.precoMin });

            if (filter?.precoMax) db.andWhere('produto.preco <= :precoMax', { precoMax: filter.precoMax });

        return db.getMany();
    }

    async find(id: number): Promise<ProdutoEntity | null> {
        return this.repository.findOne({ 
            where: { 
                id: id 
            } 
        });
    }

    async update(produto: ProdutoEntity, id: number): Promise<UpdateResult> {
        return this.repository.update(id, produto);
    }
}