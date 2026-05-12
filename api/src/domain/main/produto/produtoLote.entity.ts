import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ProdutoEntity } from "@app/domain/main/produto/produto.entity";
import { LoteEntity } from "@app/domain/main/lote/lote.entity";

@Entity({ name: '_ProdutoLote' })
export class ProdutoLoteEntity {
    @PrimaryColumn({ name: 'produtoId' })
    produtoId: number;

    @PrimaryColumn({ name: 'loteId' })
    loteId: number;

    @Column({ name: 'quantidade', nullable: false })
    quantidade: number;

    @ManyToOne(() => ProdutoEntity, (produto) => produto.lote)
    @JoinColumn({ name: 'produtoId', referencedColumnName: 'id' })
    produto: ProdutoEntity;

    @ManyToOne(() => LoteEntity, (lote) => lote.produto)
    @JoinColumn({ name: 'loteId', referencedColumnName: 'id' })
    lote: LoteEntity;
}
