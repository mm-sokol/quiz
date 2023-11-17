import { Resolver, Query, Mutation, Args, Int, ID, ResolveProperty, Parent } from '@nestjs/graphql';
import { QuestionsService } from './questions.service';
import { Question } from './entities/question.entity';
import { CreateQuestionFullInput, CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionFullInput } from './dto/update-question.input';
import { Quiz } from 'src/quizes/entities/quiz.entity';
import { CreateAnswerInput } from 'src/answers/dto/create-answer.input';

@Resolver(() => Question)
export class QuestionsResolver {
  constructor(private readonly questionsService: QuestionsService) {}

  @Mutation(() => Question)
  createQuestion(
    @Args('createQuestionFullInput') createQuestionInput: CreateQuestionFullInput,
    @Args('answersInputArray',  {type: () => [CreateAnswerInput]}) answersInput: CreateAnswerInput[]) {
    return this.questionsService.create(createQuestionInput, answersInput);
  }

  @Query(() => [Question], { name: 'questions' })
  findAll() {
    return this.questionsService.findAll();
  }

  @Query(() => Question, { name: 'question' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.questionsService.findOne(id);
  }

  @ResolveProperty(() => Quiz)
  quiz(@Parent() question: Question) {
    return question.quiz;
  }

  @Mutation(() => Question)
  updateQuestion(
    @Args({name: 'id', type: () => Int}) id: number,
    @Args('updateQuestionFullInput') updateQuestionInput: UpdateQuestionFullInput) {
    return this.questionsService.update(id, updateQuestionInput);
  }

  @Mutation(() => Question)
  removeQuestion(@Args('id', { type: () => Int }) id: number) {
    return this.questionsService.remove(id);
  }
}
