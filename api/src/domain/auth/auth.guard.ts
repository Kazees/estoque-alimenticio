import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRequest } from "./auth.request";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<AuthRequest>();
        const token = this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException();

        try {
            request.auth = await this.jwtService.verifyAsync(token);
        } 
        catch (error) {
            throw new UnauthorizedException({message: 'Funcionário não autenticado'});
        }

        return true;
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        if (type !== 'Bearer') throw new UnauthorizedException({message: 'Token inválido'});

        return token 
    }
}