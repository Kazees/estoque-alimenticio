import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoteEntity } from "@app/domain/main/lote/lote.entity";
import { Repository } from "typeorm";

@Injectable()
export class LoteRepository {
    constructor(
        @InjectRepository(LoteEntity)
        private readonly repository: Repository<LoteEntity>,
    ) {}

    async save(input: LoteEntity): Promise<LoteEntity> {
        return this.repository.save(input);
    }

    async list(): Promise<LoteEntity[]> {
        return this.repository.find({
            relations: ['fornecedor', 'fornecedor.contato', 'localizacao']
        });
    }
}