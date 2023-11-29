import { Provider } from '@nestjs/common';
import { join } from "path"
import { Answer } from 'src/answers/entities/answer.entity';
import { Question, Quiz, QuizTake, User } from 'src/internal';
import { DataSource } from "typeorm"

export const DataSourceProvider: Provider = {
    provide: 'DataSourceProvider',
    useFactory: async () => {
        const dataSource = new DataSource({
            type: "postgres",
            host: "localhost",
            port: 54033,
            username: "quizuser",
            password: "quizdbpass",
            database: "quizdb",
            synchronize: true,
            entities: [
                User, Answer, Question, Quiz, QuizTake
                // './src/**/entities/*.entitiy.ts'
              ],
            migrations: [join(process.cwd(), 'src/**/migrations/*.{ts, js}') ],
        });
        await dataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((error) => {
            console.error("Error during Data Source initialization", error)
        })
        return dataSource;
      },
}
