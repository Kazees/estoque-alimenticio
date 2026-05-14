import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { ContatoInput } from "@app/domain/main/contato/contato.input";
import { EnderecoInput } from "@app/domain/main/endereco/endereco.input";

export class FornecedorInput {
    @ApiProperty({
        example: 'Fornecedor 1',
        description: 'Nome da Empresa',
        required: true
    })
    @IsNotEmpty({ message: 'O nome da empresa deve ser informado' })
    nome_empresa: string;

    @ApiProperty({
        example: {
            codigo_pais: '55',
            ddd: '11',
            numero: '12345678'
        },
        description: 'Contato do Funcionário',
        required: true
    })
    @IsNotEmpty({ message: 'O contato deve ser informado' })
    @ValidateNested()
    @Type(() => ContatoInput)
    contato: ContatoInput;

    @ApiProperty({
        example: {
            logradouro: 'Rua 1',
            numero: 1,
            cep: '12345678'
        },
        description: 'Endereço do Funcionário',
        required: true
    })
    @IsNotEmpty({ message: 'O endereço deve ser informado' })
    @ValidateNested()
    @Type(() => EnderecoInput)
    endereco: EnderecoInput;
}

export class UpdateFornecedorInput extends PartialType(FornecedorInput) {}