import { UpdateFuncionarioInput } from "./funcionario.input";
import { FuncionarioOutput } from "../../admin/funcionario/funcionario.admin.output";
import { AuthRequest } from "../../auth/auth.request";
import { FuncionarioService } from "./funcionario.service";
export declare class FuncionarioController {
    private readonly funcinarioService;
    constructor(funcinarioService: FuncionarioService);
    update(input: UpdateFuncionarioInput, request: AuthRequest): Promise<FuncionarioOutput>;
}
