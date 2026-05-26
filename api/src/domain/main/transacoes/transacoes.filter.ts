import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { TransacaoEnum } from "@app/domain/shared/enums/transacao.enum";
import { PageFilter } from "@app/domain/shared/filter/page.filter";

export class TransacoesFilter extends PageFilter {
    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    produtoId?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    quantidade?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(TransacaoEnum)
    tipo?: TransacaoEnum;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    funcionarioId?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    dataInicio?: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    dataFim?: Date;

    constructor(produtoId?: number, quantidade?: number, tipo?: TransacaoEnum, funcionarioId?: number, dataInicio?: Date, dataFim?: Date) {
        super();
        this.produtoId = produtoId;
        this.quantidade = quantidade;
        this.tipo = tipo;
        this.funcionarioId = funcionarioId;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
    }
}