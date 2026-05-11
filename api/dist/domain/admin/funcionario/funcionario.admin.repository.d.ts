import { FuncionarioEntity } from "../../main/funcionario/funcionario.entity";
import { FuncionarioInput } from "../../main/funcionario/funcionario.input";
import { Repository } from "typeorm";
export declare class FuncionarioAdminRepository {
    private readonly repository;
    constructor(repository: Repository<FuncionarioEntity>);
    save(funcionario: FuncionarioInput): Promise<FuncionarioEntity>;
    findByEmail(email: string): Promise<FuncionarioEntity | null>;
    list(): Promise<FuncionarioEntity[]>;
}
