import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { TransacoesEntity } from "@app/domain/main/transacoes/transacoes.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { TransacoesFilter } from "./transacoes.filter";

@Injectable()
export class TransacoesRepository {
    constructor(
        @InjectRepository(TransacoesEntity)
        private readonly repository: Repository<TransacoesEntity>,
    ) {}

    async save(transacao: TransacoesEntity): Promise<TransacoesEntity> {
        return this.repository.save(transacao);
    }

    async findById(id: number): Promise<TransacoesEntity | null> {
        return this.repository
            .createQueryBuilder('transacao')
            .leftJoinAndSelect('transacao.funcionario', 'funcionario')
            .leftJoinAndSelect('funcionario.contato', 'contato')
            .leftJoinAndSelect('transacao.transacoesProduto', 'transacoesProduto')
            .leftJoinAndSelect('transacoesProduto.lote', 'lote')
            .leftJoinAndSelect('transacoesProduto.produto', 'produto')
            .where('transacao.id = :id', { id })
            .getOne();
    }

    async find(filter?: TransacoesFilter): Promise<TransacoesEntity[]> {
       const db = this.repository
        .createQueryBuilder('transacao')
        .leftJoinAndSelect('transacao.funcionario', 'funcionario')
        .leftJoinAndSelect('transacao.transacoesProduto', 'transacoesProduto')
        .leftJoinAndSelect('transacoesProduto.lote', 'lote')
        .leftJoinAndSelect('transacoesProduto.produto', 'produto')
        .leftJoinAndSelect('funcionario.contato', 'contato')
        .orderBy('transacao.createdAt', 'DESC');
        
        if (filter?.tipo) db.andWhere('transacao.tipo = :tipo', { tipo: filter.tipo });
        if (filter?.produtoId) db.andWhere('transacoesProduto.produtoId = :produtoId', { produtoId: filter.produtoId });
        if (filter?.quantidade) db.andWhere('transacoesProduto.quantidade = :quantidade', { quantidade: filter.quantidade });
        if (filter?.funcionarioId) db.andWhere('transacao.funcionarioId = :funcionarioId', { funcionarioId: filter.funcionarioId });
        if (filter?.dataInicio) db.andWhere('transacao.createdAt >= :dataInicio', { dataInicio: filter.dataInicio });
        if (filter?.dataFim) db.andWhere('transacao.createdAt <= :dataFim', { dataFim: filter.dataFim });

        return db.getMany();
    }
}