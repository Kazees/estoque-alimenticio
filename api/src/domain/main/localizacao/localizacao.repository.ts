import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LocalizacaoEntity } from "@app/domain/main/localizacao/localizacao.entity";
import { Repository } from "typeorm";

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

    async list(): Promise<LocalizacaoEntity[]> {
        return this.repository.find();
    }
}