import { ContatoInput } from "../contato/contato.input";
import { EnderecoInput } from "../endereco/endereco.input";
export declare class FuncionarioInput {
    name: string;
    email: string;
    password: string;
    contato: ContatoInput;
    endereco: EnderecoInput;
}
declare const UpdateFuncionarioInput_base: import("@nestjs/common").Type<Partial<Omit<FuncionarioInput, "password">>>;
export declare class UpdateFuncionarioInput extends UpdateFuncionarioInput_base {
}
export {};
