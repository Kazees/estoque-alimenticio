import { AuthGuard } from "@app/domain/auth/auth.guard";
import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LocalizacaoService } from "@app/domain/main/localizacao/localizacao.service";
import { LocalizacaoEntity } from "@app/domain/main/localizacao/localizacao.entity";
import { LocalizacaoFilter } from "@app/domain/main/localizacao/localizacao.filter";

@ApiBearerAuth()
@ApiTags('Localizacao')
@UseGuards(AuthGuard)
@Controller('/localizacao')
export class LocalizacaoController {
    constructor(
        private readonly localizacaoService: LocalizacaoService
    ) {}

    @Get('/:id')
    @ApiOperation({
        summary: 'Buscar uma localização por ID',
        description: 'Buscar uma localização por ID'
    })
    @ApiResponse({ status: 200, description: 'Localização encontrada', type: LocalizacaoEntity })
    @ApiResponse({ status: 404, description: 'Localização não encontrada' })
    async findOne(@Param('id') id: number): Promise<LocalizacaoEntity> {
        return this.localizacaoService.findOne(id);
    }

    @Get()
    @ApiOperation({
        summary: 'Listar localizações',
        description: 'Listar localizações disponíveis no estoque'
    })
    @ApiResponse({ status: 200, description: 'Localizações listadas com sucesso', type: [LocalizacaoEntity] })
    async list(@Query() filter?: LocalizacaoFilter): Promise<LocalizacaoEntity[]> {
        return this.localizacaoService.list(filter);
    }
}
