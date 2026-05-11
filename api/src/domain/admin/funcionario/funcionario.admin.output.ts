import { AuthRoles } from "@app/domain/auth/auth.roles";
import { ContatoEntity } from "@app/domain/main/contato/contato.entity";
import { EnderecoEntity } from "@app/domain/main/endereco/endereco.entity";
import { FuncionarioEntity } from "@app/domain/main/funcionario/funcionario.entity";
import { ApiProperty } from "@nestjs/swagger";

export class FuncionarioOutput {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    role: AuthRoles;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    contato: ContatoEntity 

    @ApiProperty()
    endereco: EnderecoEntity

    constructor(funcionario: FuncionarioEntity) {
        this.name = funcionario.name;
        this.email = funcionario.email;
        this.role = funcionario.role;
        this.active = funcionario.active;
        this.contato = funcionario.contato;
        this.endereco =  funcionario.endereco;
    }
}