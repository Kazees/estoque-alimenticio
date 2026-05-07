import { JwtService } from "@nestjs/jwt";
import { AuthPayload } from "./auth.payload";
import bcrypt from 'bcrypt';


export class CryptoService {
    constructor(private readonly jwtService: JwtService) {}

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async verify (password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    async token (auth: AuthPayload) {
        const payload: AuthPayload = {
            sub: auth.sub,
            email: auth.email,
            role: auth.role,
            name: auth.name
        };

        return await this.jwtService.signAsync(payload);
    }
}