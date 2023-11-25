import { Injectable } from '@nestjs/common';
import { CreateAnswerTakeInput } from './dto/create-answer-take.input';
import { UpdateAnswerTakeInput } from './dto/update-answer-take.input';

@Injectable()
export class AnswerTakesService {
  create(createAnswerTakeInput: CreateAnswerTakeInput) {
    return 'This action adds a new answerTake';
  }

  findAll() {
    return `This action returns all answerTakes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answerTake`;
  }

  update(id: number, updateAnswerTakeInput: UpdateAnswerTakeInput) {
    return `This action updates a #${id} answerTake`;
  }

  remove(id: number) {
    return `This action removes a #${id} answerTake`;
  }
}
