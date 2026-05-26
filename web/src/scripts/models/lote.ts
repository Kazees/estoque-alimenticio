interface LoteModel {
    id: number;
    numero_lote: number;
    preco_custo: number;
    preco_venda: number;
    localizacao: { corredores: string; prateleiras: string; seccoes: string };
    fornecedor: { nome_empresa: string; contato: { ddd: string; numero: string } };
    produto: { id: number; name: string } | null;
    data_entrada: string;
    data_validade: string;
}

interface LoteInput {
    numero_lote: number;
    preco_custo: number;
    preco_venda: number;
    localizacaoId: number;
    fornecedorId: number;
    data_entrada: string;
    data_validade: string;
    produtoId: number;
    quantidade: number;
}

export type LoteOutput = LoteModel;
export type {
    LoteModel,
    LoteInput
};
