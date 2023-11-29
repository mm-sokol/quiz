import { Resolver, Query, Mutation, Args, Int, Parent } from '@nestjs/graphql';
import { QuizesService } from './quizes.service';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizInput } from './dto/create-quiz.input';
import { UpdateQuizInput } from './dto/update-quiz.input';
import { CreateQuestionInput } from 'src/questions/dto/create-question.input';
import { QuestionsService } from 'src/questions/questions.service';

@Resolver(() => Quiz)
export class QuizesResolver {
  constructor(
    private readonly quizesService: QuizesService,
    private readonly questionsService: QuestionsService,
  ) {}

  @Mutation(() => Quiz)
  createQuiz(
    @Args('createQuizInput') createQuizInput: CreateQuizInput,
    @Args('createQuestionArray', { type: () => [CreateQuestionInput] })
    createQuestionArray: CreateQuestionInput[],
  ): Promise<Quiz> {
    return this.quizesService.create(createQuizInput, createQuestionArray);
  }

  @Query(() => [Quiz], { name: 'quizes' })
  findAll() {
    return this.quizesService.findAll();
  }

  @Query(() => Quiz, { name: 'quiz' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Quiz> {
    return this.quizesService.findOne(id);
  }

  @Mutation(() => Quiz)
  updateQuiz(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args({ name: 'UpdateQuizInput' }) UpdateQuizInput: UpdateQuizInput,
  ) {
    return this.quizesService.update(id, UpdateQuizInput);
  }

  @Mutation(() => Quiz)
  removeQuiz(@Args('id', { type: () => Int }) id: number) {
    return this.quizesService.remove(id);
  }

  // @ResolveField('questions')
  // async getQuestions(@Parent() quiz: Quiz) {
  //   const { id } = quiz;
  //   return this.questionsService.findQuizQuestions(id);
  // }
}
