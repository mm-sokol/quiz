import { Resolver, Query, Mutation, Args, Int, ID, ResolveProperty, Parent } from '@nestjs/graphql';
import { AnswersService } from './answers.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerFullInput, CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerFullInput, UpdateAnswerInput } from './dto/update-answer.input';
import { Question } from 'src/questions/entities/question.entity';

@Resolver(() => Answer)
export class AnswersResolver {
  constructor(private readonly answersService: AnswersService) {}

  @Mutation(() => Answer)
  createAnswer(
    @Args('questionId', {type: () => ID}) questionId: number,
    @Args('createAnswerInput') createAnswerInput: CreateAnswerFullInput) {
    return this.answersService.createTransaction(createAnswerInput);
  }

  @Query(() => [Answer], { name: 'answers' })
  findAll() {
    return this.answersService.findAll();
  }

  @Query(() => Answer, { name: 'answer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.answersService.findOne(id);
  }

  @Mutation(() => Answer)
  updateAnswer(
    @Args('id', {type: () => Int}) id: number,
    @Args('updateAnswerInput') updateAnswerInput: UpdateAnswerFullInput) {
    return this.answersService.update(id, updateAnswerInput);
  }

  @Mutation(() => Answer)
  removeAnswer(@Args('id', { type: () => Int }) id: number) {
    return this.answersService.remove(id);
  }

  @ResolveProperty(() => Question)
  question(@Parent() answer: Answer) {
    return answer.question;
  }
}
