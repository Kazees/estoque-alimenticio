import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { PartialType } from "@nestjs/swagger";

export class ContatoInput {
    @ApiProperty({
        example: '55',
        description: 'Código do País',
        required: true
    })
    @IsNotEmpty({ message: 'O código do país deve ser informado' })
    codigo_pais: string;

    @ApiProperty({
        example: '11',
        description: 'DDD',
        required: true
    })
    @IsNotEmpty({ message: 'O DDD deve ser informado' })
    ddd: string;

    @ApiProperty({
        example: '912345678',
        description: 'Número do Contato',
        required: true
    })
    @IsNotEmpty({ message: 'O número do contato deve ser informado' })
    numero: string;
}

export class UpdateContatoInput extends PartialType(ContatoInput) {}