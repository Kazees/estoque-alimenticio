import { forwardRef, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from "@app/domain/auth/auth.controller";
import { AuthService } from "@app/domain/auth/auth.service";
import { CryptoService } from "@app/domain/auth/crypto.service";
import { FuncionarioAdminModule } from "@app/domain/admin/funcionario/funcionario.admin.module";

@Module({
    imports: [
        JwtModule.registerAsync({
            global: true,
            useFactory: (configService: ConfigService) => {
                const secret = configService.get<string>('JWT_SECRET');
                const expiresIn = Number(configService.get<string>('JWT_EXPIRES')) || '1d';
                return {
                    secret,
                    signOptions: { expiresIn },
                };
            },
            inject: [ConfigService],
        }),
        forwardRef(() => FuncionarioAdminModule),
    ],
    controllers: [AuthController],
    providers: [AuthService, CryptoService],
    exports: [AuthService, JwtModule],
})

export class AuthModule {}