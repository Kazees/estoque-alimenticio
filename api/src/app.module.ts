import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './configs/database/database.config';


@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true 
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
      inject: [DatabaseConfig],
    }),
    
    ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
