import { Resolver, Query, Mutation, Args, Int, ID, ResolveProperty, Parent } from '@nestjs/graphql';
import { QuestionsService } from './questions.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionFullInput } from './dto/update-question.input';
import { Quiz } from 'src/quizes/entities/quiz.entity';

@Resolver(() => Question)
export class QuestionsResolver {
  constructor(private readonly questionsService: QuestionsService) {}

  @Mutation(() => Question)
  createQuestion(
    @Args({name: 'quizId', type: () => ID}) quizId: number,
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput) {
    return this.questionsService.create(createQuestionInput, quizId);
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
