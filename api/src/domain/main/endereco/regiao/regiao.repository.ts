import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegiaoEntity } from "@app/domain/main/endereco/regiao/regiao.entity";

@Injectable()
export class RegiaoRepository {
    constructor(
        @InjectRepository(RegiaoEntity)
        private readonly repository: Repository<RegiaoEntity>
    ) {}

    async list(): Promise<RegiaoEntity[]> {
        return this.repository.find({ order: { regiao: 'asc' } });
    }
}
