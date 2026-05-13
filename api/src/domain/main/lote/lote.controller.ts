import { AuthGuard } from "@app/domain/auth/auth.guard";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoteInput } from "@app/domain/main/lote/lote.input";
import { LoteOutput } from "@app/domain/main/lote/lote.output";
import { LoteService } from "@app/domain/main/lote/lote.service";

@ApiBearerAuth()
@ApiTags('Lote')
@UseGuards(AuthGuard)
@Controller('/lote')
export class LoteController {
    constructor(
        private readonly loteService: LoteService
    ) {}

    @Post()
    @ApiOperation({
        summary: 'Criar lote',
        description: 'Criar lote'
    })
    @ApiBody({ type: LoteInput, description: 'Informações do lote' })
    @ApiResponse({ status: 201, description: 'Lote criado com sucesso', type: LoteOutput })
    @ApiResponse({ status: 400, description: 'Erro ao criar lote' })
    async save(@Body() input: LoteInput): Promise<LoteOutput> {
        const lote = await this.loteService.save(input);
        return new LoteOutput(lote);
    }

    @Get()
    @ApiOperation({
        summary: 'Listar lotes',
        description: 'Listar lotes'
    })
    @ApiResponse({ status: 200, description: 'Lotes listados com sucesso', type: [LoteOutput] })
    @ApiResponse({ status: 400, description: 'Erro ao listar lotes' })
    async list(): Promise<LoteOutput[]> {
        const lotes = await this.loteService.list();
        return lotes.map(lote => new LoteOutput(lote));
    }
}