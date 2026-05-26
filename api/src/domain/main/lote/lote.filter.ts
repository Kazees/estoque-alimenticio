import { IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { PageFilter } from "@app/domain/shared/filter/page.filter";

export class LoteFilter extends PageFilter {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    produtoId?: number;
}
