import { Injectable } from '@nestjs/common';
import { CreateQuizInput } from './dto/create-quiz.input';
import { UpdateQuizInput } from './dto/update-quiz.input';

@Injectable()
export class QuizesService {
  create(createQuizInput: CreateQuizInput) {
    return 'This action adds a new quiz';
  }

  findAll() {
    return `This action returns all quizes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  update(id: number, UpdateQuizInput: UpdateQuizInput) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
