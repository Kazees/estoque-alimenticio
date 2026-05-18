import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LocalizacaoEntity } from "@app/domain/main/localizacao/localizacao.entity";
import { Repository } from "typeorm";
import { LocalizacaoFilter } from "@app/domain/main/localizacao/localizacao.filter";

@Injectable()
export class LocalizacaoRepository {
    constructor(
        @InjectRepository(LocalizacaoEntity) 
        private readonly repository: Repository<LocalizacaoEntity>
    ) {}

    async find(id: number): Promise<LocalizacaoEntity | null> {
        return this.repository.findOne({
            where: { 
                id: id 
            } 
        });
    }

    async list(filter?: LocalizacaoFilter): Promise<LocalizacaoEntity[]> {
        return this.repository.find({
            skip: ((filter?.page || 1) - 1) * (filter?.size || 10),
            take: filter?.size || 10,
        });
    }
}