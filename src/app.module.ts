import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'lodash';
import { ApolloDriver } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 54033,
      username: 'quizuser',
      password: 'quizdbpass',
      database: 'quizdb',
      entities: [
        User
        // 'src/**/entities/*.entity.ts'
        // __dirname + '/**/*.entity.ts'
      ],
      synchronize: true
    }),

    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      debug: true,
      playground: true,
      typePaths: ['./**/*.graphql'],

    }),

    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
