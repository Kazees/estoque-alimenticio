import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";

const dataSourceOptions: DataSourceOptions = {
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

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;