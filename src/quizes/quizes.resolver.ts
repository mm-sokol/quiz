import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuizesService } from './quizes.service';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizInput } from './dto/create-quiz.input';
import { UpdateQuizInput } from './dto/update-quiz.input';

@Resolver(() => Quiz)
export class QuizesResolver {
  constructor(private readonly quizesService: QuizesService) {}

  @Mutation(() => Quiz)
  createQuiz(@Args('createQuizInput') createQuizInput: CreateQuizInput) {
    return this.quizesService.create(createQuizInput);
  }

  @Query(() => [Quiz], { name: 'quizes' })
  findAll() {
    return this.quizesService.findAll();
  }

  @Query(() => Quiz, { name: 'quiz' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.quizesService.findOne(id);
  }

  @Mutation(() => Quiz)
  updateQuiz(
    @Args({name: 'id', type: () => Int}) id: number,
    @Args({name: 'UpdateQuizInput'}) UpdateQuizInput: UpdateQuizInput
    ) {
    return this.quizesService.update(id, UpdateQuizInput);
  }

  @Mutation(() => Quiz)
  removeQuiz(@Args('id', { type: () => Int }) id: number) {
    return this.quizesService.remove(id);
  }
}
