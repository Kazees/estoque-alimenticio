import { AuthGuard } from "@app/domain/auth/auth.guard";
import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TransacoesOutput } from "@app/domain/main/transacoes/transacoes.output";
import { TransacoesInput } from "@app/domain/main/transacoes/transacoes.input";
import { AuthRequest } from "@app/domain/auth/auth.request";
import { TransacoesService } from "@app/domain/main/transacoes/transacoes.service";
import { TransacoesFilter } from "@app/domain/main/transacoes/transacoes.filter";

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
        summary: 'Salvar transação',
        description: 'Salvar transação'
    })
    @ApiBody({ type: TransacoesInput, description: 'Informações da transação' })
    @ApiResponse({ status: 200, description: 'Transação criada com sucesso', type: TransacoesOutput })
    @ApiResponse({ status: 400, description: 'Erro ao criar transação' })
    async save(@Body() input: TransacoesInput, @Req() request: AuthRequest): Promise<TransacoesOutput> {
        const transacao = await this.transacoesService.save(input, Number(request.auth.sub));
        return new TransacoesOutput(transacao);
    }

    @Get()
    @ApiOperation({ 
        summary: 'Listar transações',
        description: 'Listar transações'
    })
    @ApiQuery({ type: TransacoesFilter, description: 'Filtros para listar transações', required: false })
    @ApiResponse({ status: 200, description: 'Transações listadas com sucesso', type: [TransacoesOutput] })
    @ApiResponse({ status: 400, description: 'Erro ao listar transações' })
    async list(@Query() filter?: TransacoesFilter): Promise<TransacoesOutput[]> {
        const transacoes = await this.transacoesService.list(filter);
        return transacoes.map(transacao => new TransacoesOutput(transacao));
    }
}