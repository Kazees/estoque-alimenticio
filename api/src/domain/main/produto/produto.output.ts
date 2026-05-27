import { CategoriaEnum } from "@app/domain/shared/enums/categoria.enum";
import { UnidadeMedidaEnum } from "@app/domain/shared/enums/unidademedida.enum";
import { ApiProperty } from "@nestjs/swagger";
import { InformacoesNutricionaisEntity } from "@app/domain/main/informacoes_nutricionais/informacoesNutricionais.entity";
import { ProdutoEntity } from "@app/domain/main/produto/produto.entity";

export class ProdutoOutput {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    codigo: string;

    @ApiProperty()
    descricao: string;

    @ApiProperty()
    perecivel: boolean;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    categoria: CategoriaEnum;

    @ApiProperty()
    informacoesNutricionais: InformacoesNutricionaisEntity;

    @ApiProperty()
    unidadeMedida: UnidadeMedidaEnum;

    @ApiProperty()
    cadastrado_funcionario: { id: number, name: string };

    @ApiProperty()
    lote?: {
        totalQuantidade: number;
        vencimentos: { fornecedor: string; data_validade: Date; quantidade: number }[];
    }

    constructor(produto: ProdutoEntity) {
        this.id = produto.id;
        this.name = produto.name;
        this.codigo = produto.codigo;
        this.descricao = produto.descricao;
        this.perecivel = produto.perecivel;
        this.active = produto.active;
        this.categoria = produto.categoria;
        this.informacoesNutricionais = produto.informacoesNutricionais;
        this.unidadeMedida = produto.unidadeMedida;
        this.cadastrado_funcionario = { id: produto.cadastrado_funcionarioId, name: produto.cadastrado_funcionario?.name };

        if (produto.lote?.length) {
            this.lote = {
                totalQuantidade: produto.lote.reduce((sum, pl) => sum + pl.quantidade, 0),
                vencimentos: produto.lote.map(pl => ({
                    fornecedor: pl.lote.fornecedor?.nome_empresa ?? '',
                    data_validade: pl.lote.data_validade,
                    quantidade: pl.quantidade
                }))
            };
        }
    }
}