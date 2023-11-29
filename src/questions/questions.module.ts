import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsResolver } from './questions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { DataSourceProvider } from 'src/db/data-source.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  providers: [QuestionsResolver, QuestionsService, DataSourceProvider],
  exports: [QuestionsService],
})
export class QuestionsModule {}
