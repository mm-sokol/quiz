import { Module } from '@nestjs/common';
import { QuizTakesService } from './quiz-takes.service';
import { QuizTakesResolver } from './quiz-takes.resolver';
import { QuizTake } from './entities/quiz-take.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceProvider } from 'src/db/data-source.provider';

@Module({
  imports: [TypeOrmModule.forFeature([QuizTake])],
  providers: [QuizTakesResolver, QuizTakesService, DataSourceProvider],
})
export class QuizTakesModule {}
