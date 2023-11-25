import { Module } from '@nestjs/common';
import { QuestionTakesService } from './question-takes.service';
import { QuestionTakesResolver } from './question-takes.resolver';

@Module({
  providers: [QuestionTakesResolver, QuestionTakesService],
})
export class QuestionTakesModule {}
