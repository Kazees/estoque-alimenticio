interface EnderecoModel {
    id: number;
    logradouro: string;
    numero: number;
    complemento?: string;
    cep: string;
    bairroId: number;
}

interface EnderecoInput {
    logradouro: string;
    numero: number;
    complemento?: string;
    cep: string;
    bairroId: number;
}

export type EnderecoOutput = EnderecoModel;
export type { 
    EnderecoModel, 
    EnderecoInput 
};
