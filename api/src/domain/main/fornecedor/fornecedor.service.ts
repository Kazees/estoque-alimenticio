import { Injectable, NotFoundException } from "@nestjs/common";
import { FornecedorRepository } from "@app/domain/main/fornecedor/fornecedor.repository";
import { ContatoRepository } from "@app/domain/main/contato/contato.repository";
import { EnderecoRepository } from "@app/domain/main/endereco/endereco.repository";
import { EnderecoEntity } from "@app/domain/main/endereco/endereco.entity";
import { ContatoEntity } from "@app/domain/main/contato/contato.entity";
import { FornecedorEntity } from "@app/domain/main/fornecedor/fornecedor.entity";
import { FornecedorInput, UpdateFornecedorInput } from "@app/domain/main/fornecedor/fornecedor.input";

@Injectable()
export class FornecedorService {
    constructor (
        private readonly fornecedorRepository: FornecedorRepository,
        private readonly contatoRepository: ContatoRepository,
        private readonly enderecoRepository: EnderecoRepository,
    ) {}

    async create(input: FornecedorInput): Promise<FornecedorEntity> {
        const contato = await this.contatoRepository.save(input.contato);
        const endereco = await this.enderecoRepository.save(input.endereco);
        const saved = await this.fornecedorRepository.save(FornecedorEntity.of(input, contato, endereco));

        return this.fornecedorRepository.find(saved.id) as Promise<FornecedorEntity>;
    }

    async list(): Promise<FornecedorEntity[]> {
        return this.fornecedorRepository.list();
    }

    async delete(id: number): Promise<void> {
        const fornecedor: FornecedorEntity | null = await this.fornecedorRepository.find(id);

        if (!fornecedor) throw new NotFoundException('Fornecedor nao encontrado');
        
        fornecedor.inactive();
        await this.fornecedorRepository.save(fornecedor);
    }

    async update(input: UpdateFornecedorInput, id: string): Promise<FornecedorEntity> {
        const fornecedor: FornecedorEntity | null = await this.fornecedorRepository.find(Number(id));
        if (!fornecedor) throw new NotFoundException('Fornecedor nao encontrado');

        if (input.contato) {
            const contato: ContatoEntity | null = await this.contatoRepository.find(fornecedor.contatoId);
            if (!contato) throw new NotFoundException('Contato nao encontrado');

            contato.update(input.contato);
            await this.contatoRepository.save(contato);
            fornecedor.contato = contato;
        }

        if (input.endereco) {
            const endereco: EnderecoEntity | null = await this.enderecoRepository.find(fornecedor.enderecoId);
            if (!endereco) throw new NotFoundException('Endereco nao encontrado');

            endereco.update(input.endereco);
            await this.enderecoRepository.save(endereco);
            fornecedor.endereco = endereco;
        }

        fornecedor.update(input);
        await this.fornecedorRepository.update(fornecedor, Number(id));

        return fornecedor;
    }
}