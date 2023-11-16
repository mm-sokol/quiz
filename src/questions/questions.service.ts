import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateQuestionFullInput, CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionFullInput, UpdateQuestionInput } from './dto/update-question.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { DataSource, Repository } from 'typeorm';
import { Quiz } from 'src/quizes/entities/quiz.entity';
import { CreateAnswerFullInput, CreateAnswerInput } from 'src/answers/dto/create-answer.input';
import { Answer } from 'src/answers/entities/answer.entity';

@Injectable()
export class QuestionsService {

  constructor(
    @InjectRepository(Question) private questionRepository: Repository<Question>,
    @Inject('DataSourceProvider') private readonly dataSource: DataSource) {}

  async create(
    createQuestionInput: CreateQuestionFullInput, 
    answersInput: CreateAnswerInput[]) {

    const queryRunner = this.dataSource.createQueryRunner();
    const questionRepository  = queryRunner.manager.getRepository(Question);
    const answerRepository = queryRunner.manager.getRepository(Answer);

    await queryRunner.startTransaction();
    try {
      const question = questionRepository.create(createQuestionInput);
      const saved = await questionRepository.save(question);

      const answers = answersInput.map(answerInput => {
        const answerFullInput: CreateAnswerFullInput = {
          ...answerInput, questionId: saved.id
        };
        const answer = answerRepository.create(answerFullInput);
        return answer;
      });
      const resolvedAnswers = await Promise.all(answers);
      await answerRepository.save(resolvedAnswers);
      return saved;
    }
    catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
    finally {
      await queryRunner.release();
    }
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
