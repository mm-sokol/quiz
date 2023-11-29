import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateQuestionFullInput, CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionFullInput, UpdateQuestionInput } from './dto/update-question.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { DataSource, Repository, getManager } from 'typeorm';
import { Quiz } from 'src/quizes/entities/quiz.entity';
import { CreateAnswerFullInput, CreateAnswerInput } from 'src/answers/dto/create-answer.input';
import { Answer } from 'src/answers/entities/answer.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class QuestionsService {

  constructor(
    @InjectRepository(Question) private questionRepository: Repository<Question>,
    @Inject('DataSourceProvider') private readonly dataSource: DataSource) {}

  async create(
    createQuestionInput: CreateQuestionFullInput, 
    answersInput: CreateAnswerInput[]) {

    const manager = this.dataSource.manager;

    const newId = await manager.transaction(async manager => {
      try {
        const question = this.questionRepository.create(createQuestionInput);
        const savedQuestion = await manager.save(Question, question);

        const answers = answersInput.map(answerInput => {
          const answerFullInput: CreateAnswerFullInput = {
            ...answerInput, questionId: savedQuestion.id
          };

          const answer = manager.create(Answer, answerFullInput);
          return answer;
        });
        const resolvedAnswers = await Promise.all(answers);
        const savedAnswers = await manager.save(Answer, resolvedAnswers);

        const count = await manager.count(Answer, {where: {questionId: savedQuestion.id}});
        if (count === 0) {
          throw new BadRequestException(`Failed to create answers`);
        }
        return savedQuestion.id;
      }
      catch (error) {
        throw new BadRequestException(`Transaction failed: `+error.message);
      }
    });
    const newQuestion = await manager.findOne(Question, {relations: ['answers'], where: {id: newId}});
    if (!newQuestion) {
      throw new BadRequestException(`Failed to create quetion`);
    }
    return newQuestion;  
  }

  findAll() {
    return this.questionRepository.find({relations: ['quiz', 'answers']});
  }

  findQuizQuestions(quizId: number) {
    return this.questionRepository.find({where: {quizId: quizId}, relations: ['answers']});
  }

  async findOne(id: number) {
    const question = await this.questionRepository.findOne({relations: ['quiz', 'answers'], where: {id}});
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
