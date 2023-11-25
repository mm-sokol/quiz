import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { QuizesModule } from './quizes/quizes.module';
import { Quiz } from './quizes/entities/quiz.entity';
import { QuestionsModule } from './questions/questions.module';
import { Question } from './questions/entities/question.entity';
import { AnswersModule } from './answers/answers.module';
import { Answer } from './answers/entities/answer.entity';
import { DataSourceProvider } from './db/data-source.provider';
import { QuizTakesModule } from './quiz-takes/quiz-takes.module';
import { QuestionTakesModule } from './question-takes/question-takes.module';
import { AnswerTakesModule } from './answer-takes/answer-takes.module';
import * as dotenv from 'dotenv';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        User, Quiz, Question, Answer,
        // 'src/**/entities/*.entity.ts'
        // __dirname + '/**/*.entity.ts'
      ],
      synchronize: true
    }),

    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: [process.cwd() + 'src/schema.graphql'],
      debug: true,
      playground: true,
      typePaths: ['./**/*.graphql'],

    }),

    UsersModule,
    QuizesModule,
    QuestionsModule,
    AnswersModule,
    QuizTakesModule,
    QuestionTakesModule,
    AnswerTakesModule
  ],
  controllers: [AppController],
  providers: [AppService, DataSourceProvider],
})
export class AppModule {}
