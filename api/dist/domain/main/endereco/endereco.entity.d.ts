import { EnderecoInput } from "./endereco.input";
import { BairroEntity } from "./bairro/bairro.entity";
export declare class EnderecoEntity {
    id: number;
    logradouro: string;
    numero: number;
    complemento?: string;
    cep: string;
    bairroId: number;
    bairro: BairroEntity;
    static of(input: EnderecoInput): EnderecoEntity;
    update(input: EnderecoInput): void;
}
