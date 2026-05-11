import { FuncionarioEntity } from "./funcionario.entity";
import { Repository } from "typeorm";
import { UpdateResult } from "typeorm/browser";
export declare class FuncionarioRepository {
    private readonly repository;
    constructor(repository: Repository<FuncionarioEntity>);
    find(id: number): Promise<FuncionarioEntity | null>;
    update(funcionario: FuncionarioEntity, id: number): Promise<UpdateResult>;
}
