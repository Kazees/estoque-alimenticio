import { Injectable, NotFoundException } from "@nestjs/common";
import { LocalizacaoRepository } from "@app/domain/main/localizacao/localizacao.repository";
import { LocalizacaoEntity } from "@app/domain/main/localizacao/localizacao.entity";
import { LocalizacaoFilter } from "@app/domain/main/localizacao/localizacao.filter";

@Injectable()
export class LocalizacaoService {
    constructor(
        private readonly localizacaoRepository: LocalizacaoRepository
    ) {}

    async list(filter?: LocalizacaoFilter): Promise<LocalizacaoEntity[]> {
        return this.localizacaoRepository.list(filter);
    }

    async findOne(id: number): Promise<LocalizacaoEntity> {
        const localizacao = await this.localizacaoRepository.find(id);
        if (!localizacao) throw new NotFoundException('Localização não encontrada');
        return localizacao;
    }
}
