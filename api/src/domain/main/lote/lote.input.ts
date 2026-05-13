import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty } from "class-validator";

export class LoteInput {
    @ApiProperty({
        example: 1234,
        description: 'Número do Lote',
        required: true
    })
    @IsNotEmpty({ message: 'O número do lote deve ser informado' })
    numero_lote: number;

    @ApiProperty({
        example: 123.45,
        description: 'Preço de Custo do Lote',
        required: true
    })
    @IsNotEmpty({ message: 'O preço de custo do lote deve ser informado' })
    preco_custo: number;

    @ApiProperty({
        example: 234.56,
        description: 'Preço de Venda do Lote',
        required: true
    })
    @IsNotEmpty({ message: 'O preço de venda do lote deve ser informado' })
    preco_venda: number;

    @ApiProperty({
        example: 23,
        description: 'Localização do Lote',
        required: true
    })
    @IsNotEmpty({ message: 'A localização do lote deve ser informada' })
    localizacaoId: number;

    @ApiProperty({
        example: 1,
        description: 'Fornecedor do Lote',
        required: true
    })
    @IsNotEmpty({ message: 'O fornecedor do lote deve ser informado' })
    fornecedorId: number;

    @ApiProperty({
        example: '2023-01-01',
        description: 'Data de Entrada do Lote',
        required: true
    })
    @IsNotEmpty({ message: 'A data de entrada do lote deve ser informada' })
    @IsDateString()
    data_entrada: Date;

    @ApiProperty({
        example: '2023-01-01',
        description: 'Data de Validade do Lote',
        required: true
    })
    @IsNotEmpty({ message: 'A data de validade do lote deve ser informada' })
    @IsDateString()
    data_validade: Date;

    @ApiProperty({
        example: 1,
        description: 'ID do Produto',
        required: true
    })
    @IsNotEmpty({ message: 'O produto deve ser informado' })
    produtoId: number;

    @ApiProperty({
        example: 100,
        description: 'Quantidade inicial em estoque',
        required: true
    })
    @IsNotEmpty({ message: 'A quantidade deve ser informada' })
    quantidade: number;
}