import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CryptoService } from "./crypto.service";
import { AuthOutput } from "./auth.output";

@Injectable()
export class AuthService {
    constructor (
        //private readonly funcionarioRepository: FuncionarioRepository,
        private readonly cryptoService: CryptoService
    ) {}

    /*async login(email: string, password: string): Promise<AuthOutput> {
        const auth = await this.funcionarioRepository.findByEmail(email.trim().toLowerCase());
        if (!auth) throw new UnauthorizedException({message: 'Funcionário nao encontrado'});

        const authenticated = await this.cryptoService.verify(password, auth.password);
        if (!authenticated) throw new UnauthorizedException({message: 'Senha inválida'});

        const token = await this.cryptoService.token(auth);
        return new AuthOutput(token, auth);
    }*/
}