import { Injectable, NotFoundException } from "@nestjs/common";
import { LoteInput } from "@app/domain/main/lote/lote.input";
import { LoteEntity } from "@app/domain/main/lote/lote.entity";
import { LocalizacaoRepository } from "@app/domain/main/localizacao/localizacao.repository";
import { FornecedorRepository } from "@app/domain/main/fornecedor/fornecedor.repository";
import { ProdutoLoteRepository } from "@app/domain/main/produto/produtoLote.repository";
import { LoteRepository } from "@app/domain/main/lote/lote.repository";

@Injectable()
export class LoteService {
    constructor(
        private readonly loteRepository: LoteRepository,
        private readonly fornecedorRepository: FornecedorRepository,
        private readonly localizacaoRepository: LocalizacaoRepository,
        private readonly produtoLoteRepository: ProdutoLoteRepository,
    ) {}

    async save(input: LoteInput): Promise<LoteEntity> {
        const fornecedor = await this.fornecedorRepository.find(input.fornecedorId);
        if (!fornecedor) throw new NotFoundException('Fornecedor nao encontrado')

        const localizacao = await this.localizacaoRepository.find(input.localizacaoId);
        if (!localizacao) throw new NotFoundException('Localizacao nao encontrada')

        const lote = await this.loteRepository.save(LoteEntity.of(input));
        await this.produtoLoteRepository.save(input.produtoId, lote.id, input.quantidade);

        lote.fornecedor = fornecedor;
        lote.localizacao = localizacao;

        return lote;
    }

    async list(): Promise<LoteEntity[]> {
        return this.loteRepository.list();
    }
}