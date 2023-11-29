import { Provider } from '@nestjs/common';
import { join } from 'path';
import { Answer } from 'src/answers/entities/answer.entity';
import { Question, Quiz, QuizTake, User } from 'src/internal';
import { DataSource } from 'typeorm';

export const DataSourceProvider: Provider = {
  provide: 'DataSourceProvider',
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [
        User,
        Answer,
        Question,
        Quiz,
        QuizTake,
        // './src/**/entities/*.entitiy.ts'
      ],
      migrations: [join(process.cwd(), 'src/**/migrations/*.{ts, js}')],
    });
    await dataSource
      .initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch((error) => {
        console.error('Error during Data Source initialization', error);
      });
    return dataSource;
  },
};
