import { FuncionarioInput, UpdateFuncionarioInput } from "@app/domain/main/funcionario/funcionario.input";
import { Body, Controller, Patch, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FuncionarioOutput } from "@app/domain/admin/funcionario/funcionario.admin.output";
import { AuthGuard } from "@app/domain/auth/auth.guard";
import { AuthRequest } from "@app/domain/auth/auth.request";
import { FuncionarioService } from "@app/domain/main/funcionario/funcionario.service";

@ApiBearerAuth()
@ApiTags('Funcionario')
@UseGuards(AuthGuard)
@Controller('/funcionario')
export class FuncionarioController {
    constructor(
        private readonly funcinarioService: FuncionarioService
    ) {}

    @Patch('/me')
    @ApiOperation({
        summary: 'Atualiza o funcionário logado',
        description: 'Atualiza o funcionário logado'
    })
    @ApiBody({ type: UpdateFuncionarioInput, description: 'Informações do novo funcionário' })
    @ApiResponse({ status: 201, description: 'Funcionario criado com sucesso', type: FuncionarioOutput })
    @ApiResponse({ status: 401, description: 'Funcionario sem permissão' })
    async update(@Body() input: UpdateFuncionarioInput, @Req() request: AuthRequest): Promise<FuncionarioOutput> {
        const entity = await this.funcinarioService.update(input, request.auth.sub);
        return new FuncionarioOutput(entity);
    }
}