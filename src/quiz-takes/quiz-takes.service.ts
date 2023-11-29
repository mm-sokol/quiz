import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizTakeInput } from './dto/create-quiz-take.input';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizTake } from './entities/quiz-take.entity';
import { Quiz } from 'src/quizes/entities/quiz.entity';
import { Question, QuestionType } from 'src/questions/entities/question.entity';
import { Answer } from 'src/answers/entities/answer.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class QuizTakesService {

  constructor(
    @InjectRepository(QuizTake) private readonly takeRepository: Repository<QuizTake>,
    @Inject('DataSourceProvider') private readonly dataSource: DataSource) {}

  create(createQuizTakeInput: CreateQuizTakeInput) {
    const created = this.dataSource.transaction(async (manager) => {
      try {
        let z=0;
        console.log(`---> ${z++}`);
        const quiz = await manager.findOneBy(Quiz, {id: createQuizTakeInput.quizId});
        if (!quiz) {
          throw new NotFoundException(`Quiz doesn't exist.`);
        }
        console.log(`---> ${z++}`);
        const user = await manager.findOneBy(User, {id: createQuizTakeInput.userId});
        if (!user) {
          throw new NotFoundException(`User doesn't exist.`);
        }
        console.log(`---> ${z++}`);

        let score = 0;
        const givenAnswers = createQuizTakeInput.givenAnswers;
        for (let i in givenAnswers) {
          console.log(`---> ${z++}`);
          
          const relatedQuestion = await manager.findOneByOrFail(Question, {id: givenAnswers[i].questionId});
          if (!relatedQuestion) {
            throw new NotFoundException(`Related question to ${i} given answer not found`);
          }
          else if (relatedQuestion.quizId != quiz.id) {
            throw new HttpException(`Relted question doesn't belong to quiz of id ${quiz.id}`, HttpStatus.FORBIDDEN);
          }
          console.log(`---> ${z++}`);
          const relatedAnswers = await manager.find(Answer, {where: {questionId: relatedQuestion.id}});
          if (!relatedAnswers) {
            throw new NotFoundException(`Not found answers to related question ${relatedQuestion.id}`);
          }
          console.log(`---> ${z++}`);


          switch (relatedQuestion.type) {
            case QuestionType.TEXT_ANSWER:
              console.log(`TEXT_ANSWER> ${z++}`);
              if (givenAnswers[i].text == null) {
                throw new BadRequestException(`Text answer not provided`);
              }

              for (let answer of relatedAnswers) {
                if (givenAnswers[i].text === answer.contents) {
                  score +=1;
                  break;
                }
              }

              break;
            case QuestionType.SORT_SQUENCE:
              console.log(`SORT_SQUENCE> ${z++}`);
              if (givenAnswers[i].sortedAnswers == null ) {
                throw new BadRequestException(`Sorted sequence not provided`);
              }
              if (givenAnswers[i].sortedAnswers.length < relatedAnswers.length) {
                throw new BadRequestException(`All answers have to be sorted`);
              }

              for (let p in givenAnswers[i].sortedAnswers) {
                let answer = relatedAnswers.find((ans) => ans.id === givenAnswers[i].sortedAnswers[p]);
                if (!answer) {
                  throw new BadRequestException(`Bad answer id in sorted sequence ${givenAnswers[i].sortedAnswers[p]}`);
                } 
                if (answer.correctStatus === +p) {
                  score +=1;
                }
              }
              
              break;
            case QuestionType.MULTIPLE_CHOICE:
              console.log(`MULTIPLE_CHOICE> ${z++}`);
              if (givenAnswers[i].correctAnswers == null ) {
                throw new BadRequestException(`Correct answer array not provided`);
              }
              const correctIds = relatedAnswers.filter(ans => {ans.correctStatus === 1}).map((ans) => ans.id).sort();
              const givenCorrectIds = givenAnswers[i].correctAnswers.sort();
              if (correctIds === givenCorrectIds) {
                score +=1;
              }


              break;
            case QuestionType.SINGLE_CHOICE:
              console.log(`SINGLE_CHOICE> ${z++}`);
              if (givenAnswers[i].correctAnswerId == null ) {
                throw new BadRequestException(`Correct answer not provided`);
              }
              console.log(`SINGLE_CHOICE> ${z++}`);

              console.log(JSON.stringify(relatedAnswers, null, 4));
              const correct = relatedAnswers.filter(item => item.correctStatus === 1)[0];

              console.log(`SINGLE_CHOICE> ${z++}`);
              console.log(JSON.stringify(correct, null, 4));
              if (correct.id === givenAnswers[i].correctAnswerId) {
                console.log(`SINGLE_CHOICE> ${z++}`);
                score +=1;
              }
              console.log(`SINGLE_CHOICE> ${z++}`);
              break;
            default:
              throw new  HttpException(`Unknown question type: ${relatedQuestion.type}`, HttpStatus.FORBIDDEN);
          }
        }

        const take = manager.create(QuizTake, {...createQuizTakeInput, score: score});
        return manager.save(QuizTake, take);

      } catch (error) {
        throw new BadRequestException(`Transaction failed: ${error.message}`);
      }
    });
    return created;
  }

  findAll() {
    return this.takeRepository.find();
  }

  findQuizTakes(quizId: number) {
    return this.takeRepository.findBy({quizId});
  }

  findUserTakes(userId: number) {
    return this.takeRepository.findBy({userId});
  }

  remove(id: number) {
    const removed = this.dataSource.transaction(async (manager) => {
      try {
        const toRemove = await manager.findOneByOrFail(QuizTake, {id});
        return manager.remove(QuizTake, toRemove);
      } catch (error) {
        throw new NotFoundException(`Transaction failed: ${error.message}`);
      }
    });
    return removed;
  }
}
