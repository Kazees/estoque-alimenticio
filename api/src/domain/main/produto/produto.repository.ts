import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "@app/domain/main/produto/produto.entity";
import { Repository, UpdateResult } from "typeorm";
import { ProdutoInput } from "@app/domain/main/produto/produto.input";
import { ProdutoFilter } from "@app/domain/main/produto/produto.filter";

@Injectable()
export class ProdutoRepository {
    constructor(
        @InjectRepository(ProdutoEntity) 
        private readonly repository: Repository<ProdutoEntity>
    ) {}

    async save(produto: ProdutoInput): Promise<ProdutoEntity> {
        const saved = await this.repository.save(produto);
        return this.repository.findOne({
            where: { id: saved.id },
            relations: ['cadastrado_funcionario'],
        }) as Promise<ProdutoEntity>;
    }

    async list(filter?: ProdutoFilter): Promise<ProdutoEntity[]> {
        const db = this.repository
            .createQueryBuilder('produto')
            .leftJoinAndSelect('produto.lote', 'produto_lote')
            .leftJoinAndSelect('produto_lote.lote', 'lote')
            .leftJoinAndSelect('produto.cadastrado_funcionario', 'cadastrado_funcionario')
            .orderBy('lote.data_validade', 'ASC')
            .addOrderBy('produto_lote.quantidade', 'ASC');

        if (filter?.name) db.andWhere('produto.name LIKE :name', { name: `%${filter.name}%` });
        if (filter?.active !== undefined) db.andWhere('produto.active = :active', { active: filter.active });
        if (filter?.precoMin) db.andWhere('lote.preco_venda >= :precoMin', { precoMin: filter.precoMin });
        if (filter?.precoMax) db.andWhere('lote.preco_venda <= :precoMax', { precoMax: filter.precoMax });

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