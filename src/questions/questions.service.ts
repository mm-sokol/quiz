import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionFullInput, CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionFullInput, UpdateQuestionInput } from './dto/update-question.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { Quiz } from 'src/quizes/entities/quiz.entity';

@Injectable()
export class QuestionsService {

  constructor(@InjectRepository(Question) private questionRepository: Repository<Question>) {}

  create(createQuestionInput: CreateQuestionInput, quizId: number) {
    const questionIput: CreateQuestionFullInput = {
      ...createQuestionInput, 
      quizId: quizId };

    const question = this.questionRepository.create(questionIput);
    return this.questionRepository.save(question);
  }

  findAll() {
    return this.questionRepository.find({relations: ['quiz']});
  }

  async findOne(id: number) {
    const question = await this.questionRepository.findOne({relations: ['quiz'], where: {id}});
    if (!question) {
      throw new BadRequestException(`Failed search for question of id: ${id}`);
    } 
    return question;
  }

  async update(id: number, updateQuestionInput: UpdateQuestionFullInput) {
    const updatedQuestion = await this.questionRepository.update(id, updateQuestionInput);
    if ( updatedQuestion.affected === 0 ) {
      throw new BadRequestException(`Thete is no question with id: ${id}. Cannot update.`);
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
