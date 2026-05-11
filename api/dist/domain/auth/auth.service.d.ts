import { CryptoService } from "./crypto.service";
import { AuthOutput } from "./auth.output";
import { FuncionarioAdminRepository } from "../admin/funcionario/funcionario.admin.repository";
export declare class AuthService {
    private readonly funcionarioRepository;
    private readonly cryptoService;
    constructor(funcionarioRepository: FuncionarioAdminRepository, cryptoService: CryptoService);
    login(email: string, password: string): Promise<AuthOutput>;
}
