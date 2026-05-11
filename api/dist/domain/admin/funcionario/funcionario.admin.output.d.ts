import { AuthRoles } from "../../auth/auth.roles";
import { ContatoEntity } from "../../main/contato/contato.entity";
import { EnderecoEntity } from "../../main/endereco/endereco.entity";
import { FuncionarioEntity } from "../../main/funcionario/funcionario.entity";
export declare class FuncionarioOutput {
    name: string;
    email: string;
    role: AuthRoles;
    active: boolean;
    contato: ContatoEntity;
    endereco: EnderecoEntity;
    constructor(funcionario: FuncionarioEntity);
}
