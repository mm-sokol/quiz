import { Module } from '@nestjs/common';
import { AnswerTakesService } from './answer-takes.service';
import { AnswerTakesResolver } from './answer-takes.resolver';

@Module({
  providers: [AnswerTakesResolver, AnswerTakesService],
})
export class AnswerTakesModule {}
