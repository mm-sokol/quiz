import { Injectable } from '@nestjs/common';
import { CreateQuizTakeInput } from './dto/create-quiz-take.input';
import { UpdateQuizTakeInput } from './dto/update-quiz-take.input';

@Injectable()
export class QuizTakesService {
  create(createQuizTakeInput: CreateQuizTakeInput) {
    return 'This action adds a new quizTake';
  }

  findAll() {
    return `This action returns all quizTakes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quizTake`;
  }

  update(id: number, updateQuizTakeInput: UpdateQuizTakeInput) {
    return `This action updates a #${id} quizTake`;
  }

  remove(id: number) {
    return `This action removes a #${id} quizTake`;
  }
}
