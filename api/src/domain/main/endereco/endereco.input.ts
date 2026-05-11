import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class EnderecoInput {
    @ApiProperty({
        example: 'Rua 1',
        description: 'Logradouro do Endereço',
        required: true
    })
    @IsNotEmpty({ message: 'O logradouro deve ser informado' })
    logradouro: string;

    @ApiProperty({
        example: '1234',
        description: 'Número do Endereço',
        required: true
    })
    @IsNotEmpty({ message: 'O número deve ser informado' })
    numero: number;

    @ApiProperty({
        example: 'Complemento do Endereço',
        description: 'Complemento do Endereço',
        required: false
    })
    @IsOptional()
    complemento?: string;

    @ApiProperty({
        example: '12345678',
        description: 'CEP do Endereço',
        required: true
    })
    @IsNotEmpty({ message: 'O CEP deve ser informado' })
    cep: string;

    @ApiProperty({
        example: 'Bairro 1',
        description: 'ID do Bairro',
        required: true
    })
    @IsNotEmpty({ message: 'O bairro deve ser informado' })
    bairroId: number;
}