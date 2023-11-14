import { Module } from '@nestjs/common';
import { QuizesService } from './quizes.service';
import { QuizesResolver } from './quizes.resolver';
import { Quiz } from './entities/quiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz])],
  providers: [QuizesResolver, QuizesService],
})
export class QuizesModule {}
