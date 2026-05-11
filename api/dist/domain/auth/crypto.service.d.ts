import { JwtService } from "@nestjs/jwt";
import { AuthPayload } from "./auth.payload";
export declare class CryptoService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    hash(password: string): Promise<string>;
    verify(password: string, hash: string): Promise<boolean>;
    token(auth: AuthPayload): Promise<string>;
}
