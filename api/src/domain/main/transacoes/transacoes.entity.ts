import { TransacaoEnum } from "@app/domain/shared/enums/transacao.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FuncionarioEntity } from "@app/domain/main/funcionario/funcionario.entity";
import { TransacoesProdutoLoteEntity } from "@app/domain/main/transacoes/transacoesProdutoLote.entity";
import { TransacoesInput } from "@app/domain/main/transacoes/transacoes.input";

@Entity({ name: 'Transacoes' })
export class TransacoesEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'tipo', type: 'enum', enum: TransacaoEnum, nullable: false, default: TransacaoEnum.ENTRADA })
    tipo: TransacaoEnum;

    @Column({ name: 'observacao', nullable: true })
    observacao?: string;

    @Column({ name: 'funcionarioId', nullable: false })
    funcionarioId: number;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @ManyToOne(() => FuncionarioEntity, (funcionario) => funcionario.id)
    @JoinColumn({ name: 'funcionarioId', referencedColumnName: 'id' })
    funcionario: FuncionarioEntity;

    @OneToMany(() => TransacoesProdutoLoteEntity, (tpl) => tpl.transacao)
    transacoesProduto: TransacoesProdutoLoteEntity[];

    static of(input: TransacoesInput, funcionarioId: number): TransacoesEntity {
        const transacao = new TransacoesEntity();

        transacao.tipo = input.tipo;
        transacao.observacao = input.observacao;
        transacao.funcionarioId = funcionarioId;

        return transacao;
    }
}
