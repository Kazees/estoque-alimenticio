import { AuthGuard } from "@app/domain/auth/auth.guard";
import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TransacoesOutput } from "@app/domain/main/transacoes/transacoes.output";
import { TransacoesInput } from "@app/domain/main/transacoes/transacoes.input";
import { AuthRequest } from "@app/domain/auth/auth.request";
import { TransacoesService } from "@app/domain/main/transacoes/transacoes.service";
import { TransacoesFilter } from "@app/domain/main/transacoes/transacoes.filter";
import { TransacaoEnum } from "@app/domain/shared/enums/transacao.enum";

@ApiBearerAuth()
@ApiTags('Transacoes')
@UseGuards(AuthGuard)
@Controller('/transacoes')
export class TransacoesController {
    constructor(
        private readonly transacoesService: TransacoesService
    ) {}

    @Post()
    @ApiOperation({
        summary: 'Salvar transacao',
        description: 'Salvar transacao'
    })
    @ApiBody({ type: TransacoesInput, description: 'Informacoes da transacao' })
    @ApiResponse({ status: 200, description: 'Transacao criada com sucesso', type: TransacoesOutput })
    @ApiResponse({ status: 400, description: 'Erro ao criar transacao' })
    async save(@Body() input: TransacoesInput, @Req() request: AuthRequest): Promise<TransacoesOutput> {
        const transacao = await this.transacoesService.save(input, Number(request.auth.sub));
        return new TransacoesOutput(transacao);
    }

    @Get()
    @ApiOperation({
        summary: 'Listar transacoes',
        description: 'Listar transacoes'
    })
    @ApiQuery({ name: 'produtoId', type: Number, required: false })
    @ApiQuery({ name: 'quantidade', type: Number, required: false })
    @ApiQuery({ name: 'tipo', enum: TransacaoEnum, required: false })
    @ApiQuery({ name: 'funcionarioId', type: Number, required: false })
    @ApiQuery({ name: 'dataInicio', type: String, required: false })
    @ApiQuery({ name: 'dataFim', type: String, required: false })
    @ApiResponse({ status: 200, description: 'Transacoes listadas com sucesso', type: [TransacoesOutput] })
    @ApiResponse({ status: 400, description: 'Erro ao listar transacoes' })
    async list(@Query() filter?: TransacoesFilter): Promise<TransacoesOutput[]> {
        const transacoes = await this.transacoesService.list(filter);
        return transacoes.map(transacao => new TransacoesOutput(transacao));
    }
}
