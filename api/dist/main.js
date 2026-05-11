"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: false,
        stopAtFirstError: true
    }));
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: false,
    });
    const swagger = new swagger_1.DocumentBuilder()
        .setTitle('Estoque Alimentos')
        .setDescription('API para controle de estoque de alimentos')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swagger);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(process.env.PORT || 8080);
}
bootstrap().then(() => true);
//# sourceMappingURL=main.js.map