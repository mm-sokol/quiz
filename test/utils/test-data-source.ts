import { DataSource } from 'typeorm';

export const testDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: ['./src/**/entities/*.entitiy.ts'],
});
