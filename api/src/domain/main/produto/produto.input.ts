import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { InformacoesNutricionaisInput } from "@app/domain/main/informacoes_nutricionais/informacoesNutricionais.input";
import { CategoriaEnum } from "@app/domain/shared/enums/categoria.enum";
import { Type } from "class-transformer";
import { UnidadeMedidaEnum } from "@app/domain/shared/enums/unidademedida.enum";

export class ProdutoInput {
    @ApiProperty({
        example: 'Produto 1',
        description: 'Nome do Produto',
        required: true
    })
    @IsNotEmpty({ message: 'O nome do produto deve ser informado' })
    name: string;

    @ApiProperty({
        example: '123456',
        description: 'Código do Produto',
        required: true
    })
    @IsNotEmpty({ message: 'O código do produto deve ser informado' })
    codigo: string;

    @ApiProperty({
        example: 'Feito com ingredientes naturais',
        description: 'Descrição do Produto',
        required: true
    })
    @IsNotEmpty({ message: 'A descrição do produto deve ser informada' })
    descricao: string;

    @ApiProperty({
        example: true,
        description: 'Perecível',
        required: true
    })
    @IsNotEmpty({ message: 'O perecível deve ser informado' })
    perecivel: boolean;

    @ApiProperty({
        example: CategoriaEnum.CARNES,
        description: 'Categoria do Produto',
        required: true,
        enum: CategoriaEnum
    })
    @IsNotEmpty({ message: 'A categoria do produto deve ser informada' })
    categoria: CategoriaEnum;

    @ApiProperty({
        example: {
            ingredientes: 'Alface, tomate, cebola, pimenta',
            alergenicos: 'Amendoim'
        },
        description: 'Ingredientes da Produto',
        required: false
    })
    @IsOptional()
    @ValidateNested()
    @Type(() => InformacoesNutricionaisInput)
    informacoesNutricionais?: InformacoesNutricionaisInput;

    @ApiProperty({
        example: UnidadeMedidaEnum.KG,
        description: 'Unidade de Medida do Produto',
        required: true,
        enum: UnidadeMedidaEnum
    })
    @IsNotEmpty({ message: 'A unidade de medida do produto deve ser informada' })
    unidadeMedida: UnidadeMedidaEnum;
}

export class UpdateProdutoInput extends PartialType(OmitType(ProdutoInput, ['codigo'] as const)) {}