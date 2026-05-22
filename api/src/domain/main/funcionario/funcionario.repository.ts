import { FuncionarioEntity } from "@app/domain/main/funcionario/funcionario.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateResult } from "typeorm/browser";

@Injectable()
export class FuncionarioRepository {
    constructor(
        @InjectRepository(FuncionarioEntity) 
        private readonly repository: Repository<FuncionarioEntity>
    ) {}

    async find(id: number): Promise<FuncionarioEntity | null> {
        return this.repository.findOne({
            relations: ['contato', 'endereco', 'endereco.bairro', 'endereco.bairro.municipio', 'endereco.bairro.municipio.estado', 'endereco.bairro.municipio.estado.regiao'],
            where: {
                id: id
            }
        });
    }

    async update(funcionario: FuncionarioEntity, id: number): Promise<UpdateResult> {
        return this.repository.update(id, funcionario);
    }
}