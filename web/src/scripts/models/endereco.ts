interface EnderecoModel {
    id: number;
    logradouro: string;
    numero: number;
    complemento?: string;
    cep: string;
    bairroId?: number;
    bairro?: { id: number; name: string; municipio?: { id: number; name: string; estado?: { id: number; name: string } } };
    municipioId?: number;
    municipio?: { id: number; name: string; estadoId?: number; estado?: { id: number; name: string } };
}

interface EnderecoInput {
    logradouro: string;
    numero: number;
    complemento?: string;
    cep: string;
    bairroId?: number;
    municipioId?: number;
}

export type EnderecoOutput = EnderecoModel;
export type { 
    EnderecoModel, 
    EnderecoInput 
};
