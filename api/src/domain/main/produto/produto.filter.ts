import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class ProdutoFilter {
    @ApiPropertyOptional()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional()
    @IsOptional()
    active?: string;

    @ApiPropertyOptional()
    @IsOptional()
    precoMin?: number;

    @ApiPropertyOptional()
    @IsOptional()
    precoMax?: number;

    constructor(name?: string, active?: string, precoMin?: number, precoMax?: number) {
        this.name = name;
        this.active = active;
        this.precoMin = precoMin;
        this.precoMax = precoMax;
    }
}