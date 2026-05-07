import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CryptoService } from "./crypto.service";
import { AuthOutput } from "./auth.output";
import { AuthInput } from "./auth.input";
import { AuthService } from "./auth.service";

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({
        summary: 'Authenticate user',
        description: 'Authenticate user and return JWT token'
    })
    @ApiResponse({ status: 200, description: 'User authenticated', type: AuthOutput })
    @ApiResponse({ status: 403, description: 'Unauthorized' })
    async login(@Body() input: AuthInput): Promise<undefined> {
        //return this.authService.login(input.email, input.password);
    }
}