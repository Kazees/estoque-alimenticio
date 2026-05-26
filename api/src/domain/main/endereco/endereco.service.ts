import { Injectable } from "@nestjs/common";
import { RegiaoRepository } from "@app/domain/main/endereco/regiao/regiao.repository";
import { EstadoRepository } from "@app/domain/main/endereco/estado/estado.repository";
import { MunicipioRepository } from "@app/domain/main/endereco/municipio/municipio.repository";
import { BairroRepository } from "@app/domain/main/endereco/bairro/bairro.repository";
import { RegiaoEntity } from "@app/domain/main/endereco/regiao/regiao.entity";
import { EstadoEntity } from "@app/domain/main/endereco/estado/estado.entity";
import { MunicipioEntity } from "@app/domain/main/endereco/municipio/municipio.entity";
import { BairroEntity } from "@app/domain/main/endereco/bairro/bairro.entity";

@Injectable()
export class EnderecoService {
    constructor(
        private readonly regiaoRepository: RegiaoRepository,
        private readonly estadoRepository: EstadoRepository,
        private readonly municipioRepository: MunicipioRepository,
        private readonly bairroRepository: BairroRepository,
    ) {}

    async listRegioes(): Promise<RegiaoEntity[]> {
        return this.regiaoRepository.list();
    }

    async listEstados(regiaoId?: number): Promise<EstadoEntity[]> {
        return this.estadoRepository.listByRegiao(regiaoId);
    }

    async listMunicipios(estadoId?: number): Promise<MunicipioEntity[]> {
        return this.municipioRepository.listByEstado(estadoId);
    }

    async listBairros(municipioId?: number): Promise<BairroEntity[]> {
        return this.bairroRepository.listByMunicipio(municipioId);
    }
}
