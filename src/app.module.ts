import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'lodash';
import { ApolloDriver } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      debug: true,
      playground: true,
      typePaths: ['./**/*.graphql'],

    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 54033,
      username: 'quizuser',
      password: 'quizdbpass',
      database: 'quizdb',
      entities: [
        __dirname + '/**/*.entity.{ts, js}'
      ],
      synchronize: true
    }),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
