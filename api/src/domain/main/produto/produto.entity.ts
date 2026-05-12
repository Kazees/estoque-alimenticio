import { CategoriaEnum } from "@app/domain/shared/enums/categoria.enum";
import { UnidadeMedidaEnum } from "@app/domain/shared/enums/unidademedida.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { InformacoesNutricionaisEntity } from "@app/domain/main/informacoes_nutricionais/informacoesNutricionais.entity";
import { FuncionarioEntity } from "@app/domain/main/funcionario/funcionario.entity";
import { ProdutoLoteEntity } from "@app/domain/main/produto/produtoLote.entity";
import { ProdutoInput, UpdateProdutoInput } from "./produto.input";

@Entity({ name: 'Produto' })
@Unique(['codigo'])
export class ProdutoEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'codigo', nullable: false })
    codigo: string;

    @Column({ name: 'descricao', nullable: false })
    descricao: string;

    @Column({ name: 'active', nullable: false, default: true })
    active: boolean;

    @Column({ name: 'perecivel', nullable: false, default: false })
    perecivel: boolean;

    @Column({ name: 'categoria', nullable: false, default: 'OUTROS', enum: CategoriaEnum })
    categoria: CategoriaEnum;

    @Column({ name: 'informacoesNutricionaisId', nullable: true })
    informacoesNutricionaisId?: number;

    @Column({name: 'unidadeMedida', nullable: false, default: 'UN', enum: UnidadeMedidaEnum})
    unidadeMedida: UnidadeMedidaEnum;

    @Column({ name: 'cadastrado_funcionarioId', nullable: false })
    cadastrado_funcionarioId: number;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @OneToOne(() => InformacoesNutricionaisEntity, (informacoesNutricionais) => informacoesNutricionais.id, { nullable: true })
    @JoinColumn({ name: 'informacoesNutricionaisId', referencedColumnName: 'id' })
    informacoesNutricionais: InformacoesNutricionaisEntity;

    @ManyToOne(() => FuncionarioEntity, (funcionario) => funcionario.id)
    @JoinColumn({ name: 'cadastrado_funcionarioId', referencedColumnName: 'id' })
    cadastrado_funcionario: FuncionarioEntity;

    @OneToMany(() => ProdutoLoteEntity, (pl) => pl.produto)
    lote: ProdutoLoteEntity[];

    static of(input: ProdutoInput, funcionarioId: number, informacoesNutricionaisId?: number): ProdutoEntity {
       const produto = new ProdutoEntity();

       produto.name = input.name;
       produto.codigo = input.codigo;
       produto.descricao = input.descricao;
       produto.perecivel = input.perecivel;
       produto.categoria = input.categoria;
       produto.informacoesNutricionaisId = informacoesNutricionaisId;
       produto.unidadeMedida = input.unidadeMedida;
       produto.cadastrado_funcionarioId = funcionarioId;

       return produto;
    }

    update(input: UpdateProdutoInput) {
        if (input.name) this.name = input.name;
        if (input.descricao) this.descricao = input.descricao;
        if (input.perecivel) this.perecivel = input.perecivel;
        if (input.categoria) this.categoria = input.categoria;
        if (input.unidadeMedida) this.unidadeMedida = input.unidadeMedida;

        this.updatedAt = new Date();
    }
}