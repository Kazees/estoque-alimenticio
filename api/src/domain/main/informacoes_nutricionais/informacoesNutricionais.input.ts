import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class InformacoesNutricionaisInput {
    @ApiProperty({
        example: 'Alface, tomate, cebola, pimenta',
        description: 'Ingredientes da Produto',
        required: true
    })
    @IsNotEmpty({ message: 'Os ingredientes devem ser informados' })
    ingredientes: string;

    @ApiProperty({
        example: 'Amendoim',
        description: 'Alergênicos da Produto',
    })
    @IsOptional()
    alergenicos?: string;
}