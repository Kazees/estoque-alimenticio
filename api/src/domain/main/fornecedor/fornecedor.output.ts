import { ApiProperty } from "@nestjs/swagger";
import { ContatoEntity } from "@app/domain/main/contato/contato.entity";
import { EnderecoEntity } from "@app/domain/main/endereco/endereco.entity";
import { FornecedorEntity } from "@app/domain/main/fornecedor/fornecedor.entity";

export class FornecedorOutput {
    @ApiProperty()
    nome_empresa: string;
    
    @ApiProperty()
    contato: ContatoEntity;

    @ApiProperty()
    endereco: EnderecoEntity;

    constructor(fornecedor: FornecedorEntity) {
        this.nome_empresa = fornecedor.nome_empresa;
        this.contato = fornecedor.contato;
        this.endereco = fornecedor.endereco;
    }
}