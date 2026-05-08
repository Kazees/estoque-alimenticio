import { ContatoInput } from "@app/domain/main/contato/contato.input";
import { EnderecoInput } from "@app/domain/main/endereco/endereco.input";
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, ValidateNested } from "class-validator";

export class FuncionarioInput {
    @ApiProperty({
        example: 'João da Silva',
        description: 'Nome do Funcionário',
        required: true
    })
    @IsNotEmpty({ message: 'O nome deve ser informado' })
    name: string;

    @ApiProperty({
        example: 'ZB4b4@example.com',
        description: 'E-mail do Funcionário',
        required: true
    })
    @IsEmail()
    @IsNotEmpty({ message: 'O e-mail deve ser informado' })
    email: string;

    @ApiProperty({
        example: '123456',
        description: 'Senha do Funcionário',
        required: true
    })
    @IsNotEmpty({ message: 'A senha deve ser informada' })
    password: string;

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

export class UpdateFuncionarioInput extends PartialType(OmitType(FuncionarioInput, ['password'] as const)) {}