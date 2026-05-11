import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // converte automaticamente os tipos dos dados recebidos. Ex: chega "123" como string e o DTO espera number, ele converte automaticamente.
      whitelist: true, // remove automaticamente propriedades que não estão no DTO. Se mandarem campos extras que não existem no DTO, eles são ignorados.
      forbidNonWhitelisted: false, // propriedades extras são silenciosamente removidas. Se fosse true, lançaria erro quando chegassem campos não permitidos.
      stopAtFirstError: true // para a validação no primeiro erro encontrado em vez de retornar todos os erros de uma vez.
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3000', // Onde será apenas o Vue
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: false, // Se for true, permite o envio de cookies para o front-end
  });

  const swagger = new DocumentBuilder()
    .setTitle('Estoque Alimentos')
    .setDescription('API para controle de estoque de alimentos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 8080);
}
bootstrap().then(() => true);
