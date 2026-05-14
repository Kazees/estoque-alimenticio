import { AuthGuard } from "@app/domain/auth/auth.guard";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LocalizacaoRepository } from "@app/domain/main/localizacao/localizacao.repository";
import { LocalizacaoEntity } from "@app/domain/main/localizacao/localizacao.entity";

@ApiBearerAuth()
@ApiTags('Localizacao')
@UseGuards(AuthGuard)
@Controller('/localizacao')
export class LocalizacaoController {
    constructor(
        private readonly localizacaoRepository: LocalizacaoRepository
    ) {}

    @Get()
    @ApiOperation({
        summary: 'Listar localizações',
        description: 'Listar localizações disponíveis no estoque'
    })
    @ApiResponse({ status: 200, description: 'Localizações listadas com sucesso', type: [LocalizacaoEntity] })
    async list(): Promise<LocalizacaoEntity[]> {
        return this.localizacaoRepository.list();
    }
}
