import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizInput } from './dto/create-quiz.input';
import { UpdateQuizInput } from './dto/update-quiz.input';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, getManager } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuestionsService } from 'src/questions/questions.service';
import { Question } from 'src/questions/entities/question.entity';
import { CreateQuestionFullInput, CreateQuestionInput } from 'src/questions/dto/create-question.input';
import { NotFoundError } from 'rxjs';

@Injectable()
export class QuizesService {

  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
    private questionService : QuestionsService,
    private readonly entityManager: EntityManager
    ) {}

  async create(createQuizInput: CreateQuizInput, createQuestionArray: CreateQuestionInput[]) {
    try {
      const quiz = await this.entityManager.transaction(async (transactionManager: EntityManager) => {
        
        const quiz = this.quizRepository.create(createQuizInput);
        const savedQuiz = await this.entityManager.save(Quiz, quiz);

        const questions = createQuestionArray.map(createQuestionInput => {
          const question = this.questionService.create(createQuestionInput, savedQuiz.id)
          return question;
        });
        const resolvedQuestions = await Promise.all(questions);
        const savingResult = this.entityManager.save(Question, resolvedQuestions);
        return savedQuiz;
      });

      const createdQuiz = await this.quizRepository.findOne({ relations: ['questions'], where: { id: quiz.id } });
      if (!createdQuiz) {
        throw new BadRequestException(`Failed to retrieve quiz from db.`);
      }
      return createdQuiz;
    }
    catch (error) {
      throw new BadRequestException(`Failed transaction. ${error.message}`);
    }
  }

  findAll() {
    return this.quizRepository.find({relations: ['questions']});
  }

  findOne(id: number) {
    const quiz = this.quizRepository.findOne({
      where: {id: id},
      relations: ['questions']
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz of id: ${id} doesn't exist`);
    }
    return quiz;
  }

  update(id: number, UpdateQuizInput: UpdateQuizInput) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
