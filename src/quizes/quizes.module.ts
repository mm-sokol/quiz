import { Module } from '@nestjs/common';
import { QuizesService } from './quizes.service';
import { QuizesResolver } from './quizes.resolver';
import { Quiz } from './entities/quiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsModule } from 'src/questions/questions.module';
import { DataSourceProvider } from 'src/db/data-source.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz]), QuestionsModule],
  providers: [QuizesResolver, QuizesService, DataSourceProvider],
})
export class QuizesModule {}
