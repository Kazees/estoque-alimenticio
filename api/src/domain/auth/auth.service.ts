import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CryptoService } from "@app/domain/auth/crypto.service";
import { AuthOutput } from "@app/domain/auth/auth.output";
import { FuncionarioAdminRepository } from "@app/domain/admin/funcionario/funcionario.admin.repository";
import { AuthPayload } from "@app/domain/auth/auth.payload";

@Injectable()
export class AuthService {
    constructor (
        private readonly funcionarioRepository: FuncionarioAdminRepository,// Talvez mudar para apenas o Funcionario Repository
        private readonly cryptoService: CryptoService
    ) {}

    async login(email: string, password: string): Promise<AuthOutput> {
        const auth = await this.funcionarioRepository.findByEmail(email.trim().toLowerCase());
        if (!auth) throw new UnauthorizedException({message: 'Funcionário nao encontrado'});

        const authenticated = await this.cryptoService.verify(password, auth.password);
        if (!authenticated) throw new UnauthorizedException({message: 'Senha inválida'});

        console.log('Role do funcionário:', auth.role);

        const payload: AuthPayload = {
            sub: String(auth.id),
            email: auth.email,
            role: auth.role,
            name: auth.name
        }

        const token = await this.cryptoService.token(payload);
        return new AuthOutput(token, payload);
    }
}