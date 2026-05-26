import type { ContatoModel, ContatoInput } from './contato';
import type { EnderecoModel, EnderecoInput } from './endereco';

interface FornecedorModel {
    id: number;
    nome_empresa: string;
    contato: ContatoModel;
    endereco: EnderecoModel;
}

interface FornecedorInput {
    nome_empresa: string;
    contato: ContatoInput;
    endereco: EnderecoInput;
}

interface FornecedorUpdateInput {
    nome_empresa?: string;
    contato?: ContatoInput;
    endereco?: EnderecoInput;
}

export type FornecedorOutput = FornecedorModel;
export type {
    FornecedorModel,
    FornecedorInput,
    FornecedorUpdateInput
};
