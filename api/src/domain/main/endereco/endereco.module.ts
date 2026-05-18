import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "@app/domain/auth/auth.module";
import { EnderecoEntity } from "@app/domain/main/endereco/endereco.entity";
import { BairroEntity } from "@app/domain/main/endereco/bairro/bairro.entity";
import { MunicipioEntity } from "@app/domain/main/endereco/municipio/municipio.entity";
import { EstadoEntity } from "@app/domain/main/endereco/estado/estado.entity";
import { RegiaoEntity } from "@app/domain/main/endereco/regiao/regiao.entity";
import { EnderecoController } from "@app/domain/main/endereco/endereco.controller";
import { EnderecoService } from "@app/domain/main/endereco/endereco.service";
import { EnderecoRepository } from "@app/domain/main/endereco/endereco.repository";
import { BairroRepository } from "@app/domain/main/endereco/bairro/bairro.repository";
import { MunicipioRepository } from "@app/domain/main/endereco/municipio/municipio.repository";
import { EstadoRepository } from "@app/domain/main/endereco/estado/estado.repository";
import { RegiaoRepository } from "@app/domain/main/endereco/regiao/regiao.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([EnderecoEntity, BairroEntity, MunicipioEntity, EstadoEntity, RegiaoEntity]),
        AuthModule,
    ],
    controllers: [EnderecoController],
    providers: [EnderecoService, EnderecoRepository, BairroRepository, MunicipioRepository, EstadoRepository, RegiaoRepository],
    exports: [EnderecoRepository],
})
export class EnderecoModule {}
