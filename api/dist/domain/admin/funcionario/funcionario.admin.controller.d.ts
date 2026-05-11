import { FuncionarioInput } from "../../main/funcionario/funcionario.input";
import { FuncionarioAdminService } from "./funcionario.admin.service";
import { FuncionarioOutput } from "./funcionario.admin.output";
export declare class FuncionarioAdminController {
    private readonly funcionarioAdminService;
    constructor(funcionarioAdminService: FuncionarioAdminService);
    create(input: FuncionarioInput): Promise<FuncionarioOutput>;
    list(): Promise<FuncionarioOutput[]>;
    delete(id: number): Promise<void>;
}
