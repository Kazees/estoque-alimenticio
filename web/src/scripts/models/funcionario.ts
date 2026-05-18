import type { RolesEnum } from "../utils/Enums";
import type { ContatoModel, ContatoInput } from './contato';
import type { EnderecoModel, EnderecoInput } from './endereco';

interface FuncionarioModel {
    id: number;
    name: string;
    email: string;
    active: boolean;
    role: RolesEnum;
    contato: ContatoModel;
    endereco: EnderecoModel;
}

interface FuncionarioInput {
    name: string;
    email: string;
    password: string;
    contato: ContatoInput;
    endereco: EnderecoInput;
}

interface FuncionarioUpdateInput {
    name?: string;
    email?: string;
    contato?: ContatoInput;
    endereco?: EnderecoInput;
}

export type FuncionarioOutput = FuncionarioModel
export type {
    FuncionarioModel,
    FuncionarioInput,
    FuncionarioUpdateInput
}