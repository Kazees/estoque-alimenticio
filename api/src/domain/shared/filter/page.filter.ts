import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, Min } from "class-validator";
import { Type } from "class-transformer";

export class PageFilter {
    @ApiPropertyOptional({ example: 1, description: 'Número da página (começa em 1)' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number;

    @ApiPropertyOptional({ example: 10, description: 'Quantidade de itens por página' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    size?: number;
}
