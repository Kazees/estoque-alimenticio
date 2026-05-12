import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FornecedorInput } from "@app/domain/main/fornecedor/fornecedor.input";
import { FornecedorOutput } from "@app/domain/main/fornecedor/fornecedor.output";
import { FornecedorService } from "@app/domain/main/fornecedor/fornecedor.service";
import { AuthGuard } from "@app/domain/auth/auth.guard";

@ApiBearerAuth()
@ApiTags('Fornecedor')
@UseGuards(AuthGuard)
@Controller('/fornecedor')
export class FornecedorController {
    constructor(
        private readonly fornecedorService: FornecedorService
    ) {}

    @Post()
    @ApiOperation({
        summary: 'Cria um novo fornecedor',
        description: 'Cria um novo fornecedor'
    })
    @ApiBody({ type: FornecedorInput, description: 'Informações do novo fornecedor' })
    @ApiResponse({ status: 201, description: 'Fornecedor criado com sucesso', type: FornecedorOutput })
    @ApiResponse({ status: 401, description: 'Fornecedor sem permissão' })
    async create(@Body() input: FornecedorInput): Promise<FornecedorOutput> {
        const entity = await this.fornecedorService.create(input);
        return new FornecedorOutput(entity);
    }

    @Get()
    @ApiOperation({
        summary: 'Busca todos os fornecedores',
        description: 'Busca todos os fornecedores'
    })
    @ApiResponse({ status: 200, description: 'Fornecedores encontrados', type: [FornecedorOutput] })
    @ApiResponse({ status: 401, description: 'Funcionario sem permissão' })
    async list(): Promise<FornecedorOutput[]> {
        const entities = await this.fornecedorService.list();
        return entities.map(entity => new FornecedorOutput(entity));
    }

    @Delete('/:id')
    @ApiOperation({
        summary: 'Deleta um fornecedor',
        description: 'Deleta um fornecedor'
    })
    @ApiParam({ name: 'id', description: 'ID do fornecedor', type: 'number' })
    @ApiResponse({ status: 200, description: 'Fornecedor deletado com sucesso' })
    @ApiResponse({ status: 401, description: 'Funcionario sem permissão' })
    async delete(@Param('id') id: number): Promise<void> {
        await this.fornecedorService.delete(id);
    }
}