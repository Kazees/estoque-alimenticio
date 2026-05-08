import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '@app/configs/database/database.config';
import { AuthModule } from '@app/domain/auth/auth.module';
import { FuncionarioAdminModule } from '@app/domain/admin/funcionario/funcionario.admin.module';


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
    FuncionarioAdminModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
