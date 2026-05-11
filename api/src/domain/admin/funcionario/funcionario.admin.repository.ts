import { FuncionarioEntity } from "@app/domain/main/funcionario/funcionario.entity";
import { FuncionarioInput } from "@app/domain/main/funcionario/funcionario.input";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class FuncionarioAdminRepository {
    constructor(
        @InjectRepository(FuncionarioEntity) 
        private readonly repository: Repository<FuncionarioEntity>
    ) {}

    async save(funcionario: FuncionarioInput): Promise<FuncionarioEntity> {
        return this.repository.save(funcionario);
    }

    async findByEmail(email: string): Promise<FuncionarioEntity | null> {
        return this.repository.findOne({where: {email}});
    }

    async list(): Promise<FuncionarioEntity[]> {
        return this.repository.find({
            where: {
                active: true
            },
            order: {name: 'asc'}
        });
    }
}