import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InformacoesNutricionaisRepository } from "@app/domain/main/informacoes_nutricionais/informacoesNutricionais.repository";
import { ProdutoInput, UpdateProdutoInput } from "@app/domain/main/produto/produto.input";
import { ProdutoEntity } from "@app/domain/main/produto/produto.entity";
import { InformacoesNutricionaisEntity } from "@app/domain/main/informacoes_nutricionais/informacoesNutricionais.entity";
import { ProdutoFilter } from "@app/domain/main/produto/produto.filter";
import { ProdutoRepository } from "@app/domain/main/produto/produto.repository";
import { QueryFailedError } from "typeorm";

@Injectable()
export class ProdutoService {
    constructor(
        private readonly produtoRepository: ProdutoRepository,
        private readonly informacoesNutricionaisRepository: InformacoesNutricionaisRepository
    ) {}

    async save (input: ProdutoInput, funcionarioId: number): Promise<ProdutoEntity> {
        const informacoesNutricionais = input.informacoesNutricionais ? await this.informacoesNutricionaisRepository.save(InformacoesNutricionaisEntity.of(input.informacoesNutricionais)) : null;

        try {
            return await this.produtoRepository.save(ProdutoEntity.of(input, funcionarioId, informacoesNutricionais?.id));
        } catch (error) {
            if (error instanceof QueryFailedError && (error as any).code === '23505')
                throw new ConflictException(`Já existe um produto com o código "${input.codigo}"`);
            throw error;
        }
    }

    async list(filter?: ProdutoFilter): Promise<ProdutoEntity[]> {
        return this.produtoRepository.list(filter);
    }

    async update(input: UpdateProdutoInput, id: number): Promise<ProdutoEntity> {
        const produto = await this.produtoRepository.find(id);
        if (!produto) throw new NotFoundException('Produto nao encontrado');

        if (input.informacoesNutricionais) {
            const informacoesNutricionais: InformacoesNutricionaisEntity | null = await this.informacoesNutricionaisRepository.find(produto.informacoesNutricionaisId!);
            if (!informacoesNutricionais) throw new NotFoundException('Informacoes Nutricionais nao encontradas');

            informacoesNutricionais.update(input.informacoesNutricionais);
            await this.informacoesNutricionaisRepository.save(informacoesNutricionais);
        }

        produto.update(input);
        await this.produtoRepository.update(produto, id);

        return this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<void> {
        const produto = await this.produtoRepository.find(id);
        if (!produto) throw new NotFoundException('Produto nao encontrado');
        
        produto.inactive();
        await this.produtoRepository.save(produto);
    }
}