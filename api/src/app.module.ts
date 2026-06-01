import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '@app/configs/database/database.config';
import { AuthModule } from '@app/domain/auth/auth.module';
import { FuncionarioAdminModule } from '@app/domain/admin/funcionario/funcionario.admin.module';
import { FuncionarioModule } from '@app/domain/main/funcionario/funcionario.module';
import { FornecedorModule } from '@app/domain/main/fornecedor/fornecedor.module';
import { ProdutoModule } from '@app/domain/main/produto/produto.module';
import { LoteModule } from '@app/domain/main/lote/lote.module';
import { TransacoesModule } from '@app/domain/main/transacoes/transacoes.module';
import { EnderecoModule } from '@app/domain/main/endereco/endereco.module';
import { LocalizacaoModule } from '@app/domain/main/localizacao/localizacao.module';
import { HomeModule } from '@app/domain/home/home.module';
import { CacheModule } from '@nestjs/cache-manager';
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
      inject: [DatabaseConfig],
    }),
    HomeModule,
    AuthModule,
    FuncionarioAdminModule,
    EnderecoModule,
    LocalizacaoModule,
    FuncionarioModule, FornecedorModule, ProdutoModule,
    LoteModule, TransacoesModule,
    CacheModule.registerAsync({
      useFactory: async () => ({
        stores: [
          new Keyv({
            store: new KeyvRedis(process.env.REDIS_URL ||'redis://localhost:6379'),
            ttl: 10 * 1000,
          })
        ]
      }),
      isGlobal: true,
      //ttl: 10000, // Tempo de vida do cache em segundos (10 segundos)
    })
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
