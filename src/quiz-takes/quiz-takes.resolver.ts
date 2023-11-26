import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuizTakesService } from './quiz-takes.service';
import { QuizTake } from './entities/quiz-take.entity';
import { CreateQuizTakeInput } from './dto/create-quiz-take.input';

@Resolver(() => QuizTake)
export class QuizTakesResolver {
  constructor(private readonly quizTakesService: QuizTakesService) {}

  @Mutation(() => QuizTake)
  createQuizTake(@Args('createQuizTakeInput') createQuizTakeInput: CreateQuizTakeInput) {
    return this.quizTakesService.create(createQuizTakeInput);
  }

  @Query(() => [QuizTake], { name: 'allTakes' })
  findAll() {
    return this.quizTakesService.findAll();
  }

  @Query(() => QuizTake, { name: 'quizTake' })
  findQuizTakes(@Args('id', { type: () => Int }) quizId: number) {
    return this.quizTakesService.findQuizTakes(quizId);
  }

  @Query(() => QuizTake, { name: 'userTakes' })
  findUserTakes(@Args('id', { type: () => Int }) userId: number) {
    return this.quizTakesService.findUserTakes(userId);
  }

  @Mutation(() => QuizTake)
  removeQuizTake(@Args('id', { type: () => Int }) id: number) {
    return this.quizTakesService.remove(id);
  }
}
