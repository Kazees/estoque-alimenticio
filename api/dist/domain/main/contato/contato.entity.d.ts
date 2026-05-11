import { ContatoInput } from "./contato.input";
export declare class ContatoEntity {
    id: number;
    codigo_pais: string;
    ddd: string;
    numero: string;
    static of(input: ContatoInput): ContatoEntity;
    update(input: ContatoInput): void;
}
