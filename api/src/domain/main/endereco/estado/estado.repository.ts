import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EstadoEntity } from "@app/domain/main/endereco/estado/estado.entity";

@Injectable()
export class EstadoRepository {
    constructor(
        @InjectRepository(EstadoEntity)
        private readonly repository: Repository<EstadoEntity>
    ) {}

    async listByRegiao(regiaoId?: number): Promise<EstadoEntity[]> {
        const where = regiaoId ? { regiaoId } : {};
        return this.repository.find({ where, order: { name: 'asc' } });
    }
}
