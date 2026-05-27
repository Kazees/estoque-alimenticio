import { LocalizacaoEntity } from "./localizacao.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { AuthModule } from "@app/domain/auth/auth.module";
import { LocalizacaoController } from "@app/domain/main/localizacao/localizacao.controller";
import { LocalizacaoService } from "@app/domain/main/localizacao/localizacao.service";
import { LocalizacaoRepository } from "@app/domain/main/localizacao/localizacao.repository";

@Module({
    imports: [TypeOrmModule.forFeature([LocalizacaoEntity]), AuthModule],
    controllers: [LocalizacaoController],
    providers: [LocalizacaoService, LocalizacaoRepository],
    exports: [LocalizacaoService, LocalizacaoRepository]
})
export class LocalizacaoModule {}
