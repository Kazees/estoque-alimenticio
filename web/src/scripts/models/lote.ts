interface LoteModel {
    id: number;
    numero_lote: number;
    preco_custo: number;
    preco_venda: number;
    localizacao: { id: number; corredores: string; prateleiras: string; seccoes: string };
    fornecedor: {
        id: number;
        nome_empresa: string;
        contato: { ddd: string; numero: string };
        endereco: { logradouro: string; numero: number; complemento?: string; cep: string; bairro?: { name: string }; municipio?: { name: string } } | null;
    };
    produto: { id: number; name: string; codigo: string; descricao: string; categoria: string; perecivel: boolean; unidadeMedida: string } | null;
    quantidade: number;
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
