import { Module } from '@nestjs/common';
import { QuizTakesService } from './quiz-takes.service';
import { QuizTakesResolver } from './quiz-takes.resolver';

@Module({
  providers: [QuizTakesResolver, QuizTakesService],
})
export class QuizTakesModule {}
