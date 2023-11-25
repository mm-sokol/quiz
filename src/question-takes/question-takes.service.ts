import { Injectable } from '@nestjs/common';
import { CreateQuestionTakeInput } from './dto/create-question-take.input';
import { UpdateQuestionTakeInput } from './dto/update-question-take.input';

@Injectable()
export class QuestionTakesService {
  create(createQuestionTakeInput: CreateQuestionTakeInput) {
    return 'This action adds a new questionTake';
  }

  findAll() {
    return `This action returns all questionTakes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionTake`;
  }

  update(id: number, updateQuestionTakeInput: UpdateQuestionTakeInput) {
    return `This action updates a #${id} questionTake`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionTake`;
  }
}
