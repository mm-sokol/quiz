import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizInput } from './dto/create-quiz.input';
import { UpdateQuizInput } from './dto/update-quiz.input';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuestionsService } from 'src/questions/questions.service';
import { Question } from 'src/questions/entities/question.entity';
import { CreateQuestionInput } from 'src/questions/dto/create-question.input';
import { Answer } from 'src/answers/entities/answer.entity';
import { AnswersService } from 'src/answers/answers.service';

@Injectable()
export class QuizesService {

  constructor(
    @InjectRepository(Quiz) private readonly quizRepository: Repository<Quiz>,
    @Inject('DataSourceProvider') private readonly dataSource: DataSource
    ) {}

  async create(createQuizInput: CreateQuizInput, createQuestionArray: CreateQuestionInput[]) {
    const quiz = await this.dataSource.transaction(async manager => {
      try {
        const quiz = manager.create(Quiz, createQuizInput);
        const savedQuiz = await manager.save(Quiz, quiz);

        // const newQuiz = this.quizRepository.findOne({relations: {questions: {answers: true}}, where: {id: savedQuiz.id}});
        // if (!newQuiz) {
        //   throw new BadRequestException(`Failed to create quiz`);
        // }
        return savedQuiz;
      }
      catch (error) {
        throw new BadRequestException(`Transactoin failed: `+error.message);
      }
    });
    return quiz;
  }

  findAll() {
    return this.quizRepository.find({relations: {questions: {answers: true}}});
  }

  findOne(id: number) {
    const quiz = this.quizRepository.findOne({
      where: {id: id},
      relations: {questions: {answers: true}}
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz of id: ${id} doesn't exist`);
    }
    return quiz;
  }

  async update(id: number, updateQuizInput: UpdateQuizInput) {
    const quiz = await this.dataSource.transaction(async manager => {
      try {
        const quiz = await manager.findOneBy(Quiz, {id});
        if (!quiz) {
          throw new BadRequestException(`Quiz of id: ${id} not found.`);
        }
        const updated = manager.update(Quiz, id, updateQuizInput);
        return updated;
      }
      catch (error) {
        throw new BadRequestException(`Transaction failed: `+error.message);
      }
    });
    return quiz;
  }

  async remove(id: number) {
    const quiz = await this.dataSource.transaction(async manager => {
      try {
        const quiz = await manager.findOneBy(Quiz, {id});
        if (!quiz) {
          throw new BadRequestException(`Quiz of id: ${id} not found.`);
        }
        
        const questions = await manager.findBy(Question, {quizId: id});
        console.log(`Removing ${questions.length} questions.`);
        
        if (questions.length >= 0) {
          const questionIds = questions.map(questions => questions.id);
          const answers = await manager.find(Answer, {where: {questionId: In(questionIds)}});     

          console.log(`Removing ${answers.length} answers.`);
          if (answers.length >= 0) {
            await manager.remove(Answer, answers);
          }
          await manager.remove(Question, questions);
        }
        
        const removed = manager.remove(Quiz, quiz);
        return removed;
      }
      catch (error) {
        throw new BadRequestException(`Transaction failed: `+error.message);
      }
    });
    return quiz;
  }
}
