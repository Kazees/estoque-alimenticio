import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@app/domain/auth/auth.guard";
import { EnderecoService } from "@app/domain/main/endereco/endereco.service";
import { RegiaoEntity } from "@app/domain/main/endereco/regiao/regiao.entity";
import { EstadoEntity } from "@app/domain/main/endereco/estado/estado.entity";
import { MunicipioEntity } from "@app/domain/main/endereco/municipio/municipio.entity";
import { BairroEntity } from "@app/domain/main/endereco/bairro/bairro.entity";

@ApiBearerAuth()
@ApiTags('Endereco')
@UseGuards(AuthGuard)
@Controller('/endereco')
export class EnderecoController {
    constructor(private readonly enderecoService: EnderecoService) {}

    @Get('/regioes')
    @ApiOperation({ summary: 'Listar regioes', description: 'Listar todas as regioes' })
    @ApiResponse({ status: 200, type: [RegiaoEntity] })
    async listRegioes(): Promise<RegiaoEntity[]> {
        return this.enderecoService.listRegioes();
    }

    @Get('/estados')
    @ApiOperation({ summary: 'Listar estados', description: 'Listar estados, opcionalmente filtrados por regiao' })
    @ApiQuery({ name: 'regiaoId', type: Number, required: false })
    @ApiResponse({ status: 200, type: [EstadoEntity] })
    async listEstados(@Query('regiaoId') regiaoId?: number): Promise<EstadoEntity[]> {
        return this.enderecoService.listEstados(regiaoId ? Number(regiaoId) : undefined);
    }

    @Get('/municipios')
    @ApiOperation({ summary: 'Listar municipios', description: 'Listar municipios, opcionalmente filtrados por estado' })
    @ApiQuery({ name: 'estadoId', type: Number, required: false })
    @ApiResponse({ status: 200, type: [MunicipioEntity] })
    async listMunicipios(@Query('estadoId') estadoId?: number): Promise<MunicipioEntity[]> {
        return this.enderecoService.listMunicipios(estadoId ? Number(estadoId) : undefined);
    }

    @Get('/bairros')
    @ApiOperation({ summary: 'Listar bairros', description: 'Listar bairros, opcionalmente filtrados por municipio' })
    @ApiQuery({ name: 'municipioId', type: Number, required: false })
    @ApiResponse({ status: 200, type: [BairroEntity] })
    async listBairros(@Query('municipioId') municipioId?: number): Promise<BairroEntity[]> {
        return this.enderecoService.listBairros(municipioId ? Number(municipioId) : undefined);
    }
}
