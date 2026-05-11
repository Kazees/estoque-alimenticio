import { AuthRoles } from "../../auth/auth.roles";
import { ContatoEntity } from "../contato/contato.entity";
import { EnderecoEntity } from "../endereco/endereco.entity";
import { FuncionarioInput, UpdateFuncionarioInput } from "./funcionario.input";
export declare class FuncionarioEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    role: AuthRoles;
    active: boolean;
    contatoId: number;
    enderecoId: number;
    createdAt: Date;
    updatedAt: Date;
    contato: ContatoEntity;
    endereco: EnderecoEntity;
    static of(input: FuncionarioInput, contatoId: ContatoEntity, enderecoId: EnderecoEntity): FuncionarioEntity;
    inactive(): void;
    update(input: UpdateFuncionarioInput): void;
}
