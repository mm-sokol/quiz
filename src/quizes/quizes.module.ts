import { Module } from '@nestjs/common';
import { QuizesService } from './quizes.service';
import { QuizesResolver } from './quizes.resolver';

@Module({
  providers: [QuizesResolver, QuizesService],
})
export class QuizesModule {}
