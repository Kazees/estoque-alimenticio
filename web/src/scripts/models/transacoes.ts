import type { TransacaoEnum } from '../utils/Enums';

interface TransacoesModel {
    id: number;
    tipo: TransacaoEnum;
    observacao?: string;
    funcionario: { name: string; email: string; contato: { ddd: string; numero: string } };
    produto: { name: string; codigo: string };
    lote: { numero_lote: number; preco_custo: number; preco_venda: number };
    quantidade: number;
    createdAt: string;
}

interface TransacoesInput {
    tipo: TransacaoEnum;
    observacao?: string;
    loteId: number;
    produtoId: number;
    quantidade: number;
}

interface TransacoesFilter {
    produtoId?: number;
    quantidade?: number;
    tipo?: TransacaoEnum;
    funcionarioId?: number;
    dataInicio?: string;
    dataFim?: string;
    page?: number;
    size?: number;
}

export type TransacoesOutput = TransacoesModel;
export type {
    TransacoesModel,
    TransacoesInput,
    TransacoesFilter
};
