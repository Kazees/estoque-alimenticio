interface ContatoModel {
    id: number;
    codigo_pais: string;
    ddd: string;
    numero: string;
}

interface ContatoInput {
    codigo_pais: string;
    ddd: string;
    numero: string;
}

export type ContatoOutput = ContatoModel;
export type { 
    ContatoModel, 
    ContatoInput 
};
