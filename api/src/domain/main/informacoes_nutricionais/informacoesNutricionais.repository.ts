import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InformacoesNutricionaisEntity } from "@app/domain/main/informacoes_nutricionais/informacoesNutricionais.entity";
import { Repository } from "typeorm";
import { InformacoesNutricionaisInput } from "@app/domain/main/informacoes_nutricionais/informacoesNutricionais.input";

@Injectable()
export class InformacoesNutricionaisRepository {
    constructor(
        @InjectRepository(InformacoesNutricionaisEntity)
        private readonly repository: Repository<InformacoesNutricionaisEntity>
    ) {}

    async save(informacoesNutricionais: InformacoesNutricionaisInput): Promise<InformacoesNutricionaisEntity> {
        return this.repository.save(informacoesNutricionais);
    }

    async find(id: number): Promise<InformacoesNutricionaisEntity | null> {
        return this.repository.findOne({ 
            where: { 
                id: id 
            } 
        });
    }
}