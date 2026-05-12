import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { LocalizacaoEntity } from "@app/domain/main/localizacao/localizacao.entity";
import { FornecedorEntity } from "@app/domain/main/fornecedor/fornecedor.entity";
import { ProdutoLoteEntity } from "@app/domain/main/produto/produtoLote.entity";

@Entity({ name: 'Lote' })
@Unique(['numero_lote', 'fornecedorId'])
export class LoteEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'numero_lote', nullable: false })
    numero_lote: number;

    @Column({ name: 'preco_custo', type: 'decimal', nullable: false })
    preco_custo: number;

    @Column({ name: 'preco_venda', type: 'decimal', nullable: false })
    preco_venda: number;

    @Column({ name: 'localizacaoId', nullable: false })
    localizacaoId: number;

    @Column({ name: 'fornecedorId', nullable: false })
    fornecedorId: number;

    @Column({ name: 'data_entrada', nullable: false })
    data_entrada: Date;

    @Column({ name: 'data_validade', nullable: false })
    data_validade: Date;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @ManyToOne(() => LocalizacaoEntity)
    @JoinColumn({ name: 'localizacaoId', referencedColumnName: 'id' })
    localizacao: LocalizacaoEntity;

    @ManyToOne(() => FornecedorEntity)
    @JoinColumn({ name: 'fornecedorId', referencedColumnName: 'id' })
    fornecedor: FornecedorEntity;

    @OneToMany(() => ProdutoLoteEntity, (pl) => pl.lote)
    produto: ProdutoLoteEntity[];
}
