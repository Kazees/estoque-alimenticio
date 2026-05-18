import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";
import { Transform, Type } from "class-transformer";
import { PageFilter } from "@app/domain/shared/filter/page.filter";

export class ProdutoFilter extends PageFilter {
    @ApiPropertyOptional({ example: '' })
    @IsOptional()
    name?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return undefined;
    })
    @IsBoolean()
    active?: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    precoMin?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    precoMax?: number;

    constructor(name?: string, active?: boolean, precoMin?: number, precoMax?: number) {
        super();
        this.name = name;
        this.active = active;
        this.precoMin = precoMin;
        this.precoMax = precoMax;
    }
}