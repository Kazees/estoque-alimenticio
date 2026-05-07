import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                const secret = configService.get<string>('JWT_SECRET');
                const expiresIn = Number(configService.get<string>('JWT_EXPIRES')) || '1d';
                return {
                    secret,
                    signOptions: { expiresIn },
                };
            },
            inject: [ConfigService],
        })
    ],
    //controllers: [AuthController],
    //providers: [AuthService],
    //exports: [AuthService],
})

export class AuthModule {}