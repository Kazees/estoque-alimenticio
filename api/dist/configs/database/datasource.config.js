"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const typeorm_1 = require("typeorm");
const dataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5433,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'dbestoque',
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    migrations: ['src/configs/migrations/*{.ts,.js}'],
    migrationsTableName: 'Migrations',
    synchronize: false
};
const dataSource = new typeorm_1.DataSource(dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=datasource.config.js.map