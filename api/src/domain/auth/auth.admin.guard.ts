import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRequest } from "./auth.request";
import { Request } from "express";
import { AuthRoles } from "./auth.roles";

@Injectable()
export class AuthAdminGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
            console.log('=== GUARD CHAMADO ===');
    const request = context.switchToHttp().getRequest<AuthRequest>();
    console.log('Authorization:', request.headers.authorization);
    console.log('Headers completos:', JSON.stringify(request.headers));
    const token = this.extractTokenFromHeader(request);
    console.log('Token:', token);
        if (!token) throw new UnauthorizedException();

        try {
            const data = await this.jwtService.verifyAsync(token);
            if (data.role !== AuthRoles.ADMIN) throw new UnauthorizedException({message: 'Funcionário sem permissão'});
            request.auth = data;
        } 
        catch (error: any) {
            console.log('JWT Error:', error.message);
    console.log('Secret usado:', this.jwtService);
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