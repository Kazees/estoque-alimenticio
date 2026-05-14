import { TransacaoEnum } from "@app/domain/shared/enums/transacao.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class TransacoesInput {
    @ApiProperty({
        example: TransacaoEnum.ENTRADA,
        description: 'Tipo da Transação',
        required: true,
        enum: TransacaoEnum
    })
    @IsNotEmpty({ message: 'O tipo da transação deve ser informado' })
    tipo: TransacaoEnum;

    @ApiProperty({
        example: 'Observação da Transação',
        description: 'Observação da Transação',
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
    loteId: number;

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