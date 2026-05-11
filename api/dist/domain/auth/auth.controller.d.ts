import { AuthOutput } from "./auth.output";
import { AuthInput } from "./auth.input";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(input: AuthInput): Promise<AuthOutput>;
}
