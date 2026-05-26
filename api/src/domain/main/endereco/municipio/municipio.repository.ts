import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MunicipioEntity } from "@app/domain/main/endereco/municipio/municipio.entity";

@Injectable()
export class MunicipioRepository {
    constructor(
        @InjectRepository(MunicipioEntity)
        private readonly repository: Repository<MunicipioEntity>
    ) {}

    async listByEstado(estadoId?: number): Promise<MunicipioEntity[]> {
        const where = estadoId ? { estadoId } : {};
        return this.repository.find({ where, order: { name: 'asc' } });
    }
}
