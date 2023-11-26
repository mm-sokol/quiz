import { Inject, Injectable } from '@nestjs/common';
import { CreateQuizTakeInput } from './dto/create-quiz-take.input';
import { DataSource } from 'typeorm';

@Injectable()
export class QuizTakesService {

  constructor(@Inject('DataSourceService') private readonly dataSource: DataSource) {}

  create(createQuizTakeInput: CreateQuizTakeInput) {
    return 'This action adds a new quizTake';
  }

  findAll() {
    return `This action returns all quizTakes`;
  }

  findQuizTakes(quizId: number) {
    return `This action returns a #${quizId} quizTake`;
  }

  findUserTakes(userId: number) {
    return "";
  }

  remove(id: number) {
    return `This action removes a #${id} quizTake`;
  }
}
