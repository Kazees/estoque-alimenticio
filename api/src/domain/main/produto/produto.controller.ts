import { AuthGuard } from "@app/domain/auth/auth.guard";
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProdutoInput, UpdateProdutoInput } from "@app/domain/main/produto/produto.input";
import { ProdutoOutput } from "@app/domain/main/produto/produto.output";
import { ProdutoFilter } from "@app/domain/main/produto/produto.filter";
import { AuthRequest } from "@app/domain/auth/auth.request";
import { ProdutoService } from "@app/domain/main/produto/produto.service";
import { AuthAdminGuard } from "@app/domain/auth/auth.admin.guard";

@ApiBearerAuth()
@ApiTags('Produto')
@UseGuards(AuthGuard)
@Controller('/produto')
export class ProdutoController {
    constructor(
        private readonly produtoService: ProdutoService
    ) {}

    @Post()
    @ApiOperation({ 
        summary: 'Criar um produto',
        description: 'Criar um produto'
    })
    @ApiBody({ type: ProdutoInput, description: 'Informações do produto' })
    @ApiResponse({ status: 201, description: 'Produto criado com sucesso' })
    @ApiResponse({ status: 404, description: 'Erro ao criar o produto' })
    async save(@Body() input: ProdutoInput, @Req() request: AuthRequest): Promise<ProdutoOutput> {
        const produto = await this.produtoService.save(input, Number(request.auth.sub));
        return new ProdutoOutput(produto);
    }

    @Patch('/:id')
    @UseGuards(AuthAdminGuard)
    @ApiOperation({ 
        summary: 'Atualizar um produto',
        description: 'Atualizar um produto'
    })
    @ApiBody({ type: UpdateProdutoInput, description: 'Informações do produto' })
    @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso', type: ProdutoOutput })
    @ApiResponse({ status: 404, description: 'Erro ao atualizar o produto' })
    async update(@Body() input: UpdateProdutoInput, @Param('id') id: number): Promise<ProdutoOutput> {
        const produto = await this.produtoService.update(input, id);
        return new ProdutoOutput(produto);
    }

    @Delete('/:id')
    @UseGuards(AuthAdminGuard)
    @ApiOperation({ 
        summary: 'Deletar um produto',
        description: 'Deletar um produto'
    })
    @ApiResponse({ status: 200, description: 'Produto deletado com sucesso' })
    @ApiResponse({ status: 404, description: 'Erro ao deletar o produto' })
    async delete(@Param('id') id: number): Promise<void> {
        await this.produtoService.delete(id);
    }

    @Get()
    @ApiOperation({ 
        summary: 'Listar todos os produtos',
        description: 'Listar todos os produtos'
    })
    @ApiQuery({ type: ProdutoFilter, name: 'filter', required: false })
    @ApiResponse({ status: 200, description: 'Produtos listados com sucesso', type: [ProdutoOutput] })
    @ApiResponse({ status: 404, description: 'Erro ao listar os produtos' })
    async list(@Query() filter?: ProdutoFilter): Promise<ProdutoOutput[]> {
        const produtos = await this.produtoService.list(filter);
        return produtos.map(produto => new ProdutoOutput(produto));
    }
}