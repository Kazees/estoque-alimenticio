import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FornecedorEntity } from "@app/domain/main/fornecedor/fornecedor.entity";
import { Repository, UpdateResult } from "typeorm";

@Injectable()
export class FornecedorRepository {
    constructor(
        @InjectRepository(FornecedorEntity)
        private readonly repository: Repository<FornecedorEntity>
    ) {}

    async save(fornecedor: FornecedorEntity): Promise<FornecedorEntity> {
        return this.repository.save(fornecedor);
    }

    async find(id: number): Promise<FornecedorEntity | null> {
        return this.repository.findOne({
            relations: ['contato', 'endereco'],
            where: { 
                id: id 
            } 
        });
    }

    async list(): Promise<FornecedorEntity[]> {
        return this.repository.find({
            relations: ['contato', 'endereco'],
            where: { 
                active: true 
            },
            order: {nome_empresa: 'asc'}
        });
    }

    async update(fornecedor: FornecedorEntity, id: number): Promise<UpdateResult> {
        return this.repository.update(id, fornecedor);
    }
}