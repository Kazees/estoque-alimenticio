import { TransacaoEnum } from "@app/domain/shared/enums/transacao.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";
import { Type } from "class-transformer";

export class TransacoesInput {
    @ApiProperty({
        example: TransacaoEnum.ENTRADA,
        description: 'Tipo da Transação',
        required: true,
        enum: TransacaoEnum
    })
    @IsNotEmpty({ message: 'O tipo da transação deve ser informado' })
    @IsEnum(TransacaoEnum, { message: 'O tipo da transação deve ser ENTRADA ou SAIDA' })
    tipo: TransacaoEnum;

    @ApiProperty({
        example: 'Observação da Transação',
        description: 'Observação da Transação',
        required: false
    })
    @IsOptional()
    observacao?: string;

    @ApiProperty({
        example: 1,
        description: 'ID do Lote',
        required: true
    })
    @IsNotEmpty({ message: 'O lote deve ser informado' })
    @Type(() => Number)
    @IsNumber({}, { message: 'O lote deve ser um número' })
    loteId: number;

    @ApiProperty({
        example: 1,
        description: 'ID do Produto',
        required: true
    })
    @IsNotEmpty({ message: 'O produto deve ser informado' })
    @Type(() => Number)
    @IsNumber({}, { message: 'O produto deve ser um número' })
    produtoId: number;

    @ApiProperty({
        example: 100,
        description: 'Quantidade inicial em estoque',
        required: true
    })
    @IsNotEmpty({ message: 'A quantidade deve ser informada' })
    @Type(() => Number)
    @IsNumber({}, { message: 'A quantidade deve ser um número' })
    @Min(1, { message: 'A quantidade deve ser maior que zero' })
    quantidade: number;
}
