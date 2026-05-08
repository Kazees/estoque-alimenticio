import { AuthAdminGuard } from "@app/domain/auth/auth.admin.guard";
import { FuncionarioInput } from "@app/domain/main/funcionario/funcionario.input";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FuncionarioAdminService } from "@app/domain/admin/funcionario/funcionario.admin.service";
import { FuncionarioOutput } from "@app/domain/admin/funcionario/funcionario.admin.output";

@ApiBearerAuth()
@ApiTags('Admin Funcionario')
@UseGuards(AuthAdminGuard)
@Controller('admin/funcionario')
export class FuncionarioAdminController {
    constructor(
        private readonly funcionarioAdminService: FuncionarioAdminService
    ) {}

    @Post()
    @ApiOperation({
        summary: 'Cria um novo funcionário',
        description: 'Cria um novo funcionário'
    })
    @ApiBody({ type: FuncionarioInput, description: 'Informações do novo funcionário' })
    @ApiResponse({ status: 201, description: 'Funcionario criado com sucesso', type: FuncionarioOutput })
    @ApiResponse({ status: 401, description: 'Funcionario sem permissão' })
    async create(@Body() input: FuncionarioInput): Promise<FuncionarioOutput> {
        const entity = await this.funcionarioAdminService.create(input);
        return new FuncionarioOutput(entity);
    }
}