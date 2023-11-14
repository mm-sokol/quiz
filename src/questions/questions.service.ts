import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsService {

  constructor(@InjectRepository(Question) private questionRepository: Repository<Question>) {}

  create(createQuestionInput: CreateQuestionInput) {
    const question = this.questionRepository.create(createQuestionInput);
    return this.questionRepository.save(question);
  }

  findAll() {
    return this.questionRepository.find();
  }

  async findOne(id: number) {
    try {
      const question = await this.questionRepository.findOneByOrFail({id});
    }
    catch (error) {
      throw new HttpException(
        `Invalid request for question of id: ${id}.`,
        HttpStatus.BAD_REQUEST
      );
    }  
  }

  async update(id: number, updateQuestionInput: UpdateQuestionInput) {
    const updatedQuestion = await this.questionRepository.update(id, updateQuestionInput);
    if ( updatedQuestion.affected === 0 ) {
      throw new HttpException(
        `Thete is no question with id: ${id}. Cannot update.`,
        HttpStatus.BAD_REQUEST
      );
    }
    return this.questionRepository.findOneByOrFail({id});
  }

  async remove(id: number) {
    const question = await this.questionRepository.findOneBy({id});
    if (!question) {
      throw new HttpException(
        `Thete is no question with id: ${id}. Cannot delete.`,
        HttpStatus.BAD_REQUEST
      );
    }
    return this.questionRepository.remove(question);
  }
}
