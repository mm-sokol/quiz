import { Module } from '@nestjs/common';
import { QuizTakesService } from './quiz-takes.service';
import { QuizTakesResolver } from './quiz-takes.resolver';
import { QuizTake } from './entities/quiz-take.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsModule } from 'src/questions/questions.module';
import { AnswersModule } from 'src/answers/answers.module';
import { DataSourceProvider } from 'src/db/data-source.provider';
import { QuizesModule } from 'src/quizes/quizes.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([QuizTake]), QuestionsModule, AnswersModule, QuizesModule, UsersModule],
  providers: [QuizTakesResolver, QuizTakesService, DataSourceProvider],
})
export class QuizTakesModule {}
