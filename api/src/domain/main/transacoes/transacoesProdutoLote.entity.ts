import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { TransacoesEntity } from "@app/domain/main/transacoes/transacoes.entity";
import { ProdutoEntity } from "@app/domain/main/produto/produto.entity";
import { LoteEntity } from "@app/domain/main/lote/lote.entity";

@Entity({ name: '_TransacaoProdutoLote' })
export class TransacoesProdutoLoteEntity {
    @PrimaryColumn({ name: 'transacaoId' })
    transacaoId: number;

    @PrimaryColumn({ name: 'produtoId' })
    produtoId: number;

    @PrimaryColumn({ name: 'loteId' })
    loteId: number;

    @Column({ name: 'quantidade', nullable: false })
    quantidade: number;

    @ManyToOne(() => TransacoesEntity, (transacao) => transacao.transacoesProduto)
    @JoinColumn({ name: 'transacaoId', referencedColumnName: 'id' })
    transacao: TransacoesEntity;

    @ManyToOne(() => ProdutoEntity, (produto) => produto.transacoesProduto)
    @JoinColumn({ name: 'produtoId', referencedColumnName: 'id' })
    produto: ProdutoEntity;

    @ManyToOne(() => LoteEntity, (lote) => lote.transacoesProduto)
    @JoinColumn({ name: 'loteId', referencedColumnName: 'id' })
    lote: LoteEntity;
}