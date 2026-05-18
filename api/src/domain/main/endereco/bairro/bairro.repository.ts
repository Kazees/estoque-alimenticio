import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BairroEntity } from "@app/domain/main/endereco/bairro/bairro.entity";

@Injectable()
export class BairroRepository {
    constructor(
        @InjectRepository(BairroEntity)
        private readonly repository: Repository<BairroEntity>
    ) {}

    async listByMunicipio(municipioId?: number): Promise<BairroEntity[]> {
        const where = municipioId ? { municipioId } : {};
        return this.repository.find({ where, order: { name: 'asc' } });
    }
}
