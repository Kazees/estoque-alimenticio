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


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
      inject: [DatabaseConfig],
    }),
    AuthModule,
    FuncionarioAdminModule,
    FuncionarioModule, FornecedorModule, ProdutoModule,
    LoteModule, TransacoesModule],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
