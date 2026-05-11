import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
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
    @ApiOperation({
        summary: 'Authenticate user',
        description: 'Authenticate user and return JWT token'
    })
    @ApiResponse({ status: 201, description: 'User authenticated', type: AuthOutput })
    @ApiResponse({ status: 403, description: 'Unauthorized' })
    async login(@Body() input: AuthInput): Promise<AuthOutput> {
        return this.authService.login(input.email, input.password);
    }
}