import type { CategoriaEnum, UnidadeMedidaEnum } from '../utils/Enums';

interface InformacoesNutricionaisModel {
    id: number;
    ingredientes: string;
    alergenicos?: string;
}

interface InformacoesNutricionaisInput {
    ingredientes: string;
    alergenicos?: string;
}

interface ProdutoModel {
    id: number;
    name: string;
    codigo: string;
    descricao: string;
    perecivel: boolean;
    active: boolean;
    categoria: CategoriaEnum;
    informacoesNutricionais: InformacoesNutricionaisModel;
    unidadeMedida: UnidadeMedidaEnum;
    cadastrado_funcionario: { 
        id: number; 
        name: string 
    };
    lote?: {
        totalQuantidade: number;
        vencimentos: { fornecedor: string; data_validade: string; quantidade: number }[];
    }
}

interface ProdutoInput {
    name: string;
    codigo: string;
    descricao: string;
    perecivel: boolean;
    categoria: CategoriaEnum;
    informacoesNutricionais?: InformacoesNutricionaisInput;
    unidadeMedida: UnidadeMedidaEnum;
}

interface ProdutoUpdateInput {
    name?: string;
    descricao?: string;
    perecivel?: boolean;
    categoria?: CategoriaEnum;
    informacoesNutricionais?: InformacoesNutricionaisInput;
    unidadeMedida?: UnidadeMedidaEnum;
}

interface ProdutoFilter {
    name?: string;
    active?: boolean;
    precoMin?: number;
    precoMax?: number;
    page?: number;
    size?: number;
}

export type ProdutoOutput = ProdutoModel;
export type {
    ProdutoModel,
    ProdutoInput,
    ProdutoUpdateInput,
    ProdutoFilter,
    InformacoesNutricionaisModel,
    InformacoesNutricionaisInput
};
