import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuizTakesService } from './quiz-takes.service';
import { QuizTake } from './entities/quiz-take.entity';
import { CreateQuizTakeInput } from './dto/create-quiz-take.input';
import { UpdateQuizTakeInput } from './dto/update-quiz-take.input';

@Resolver(() => QuizTake)
export class QuizTakesResolver {
  constructor(private readonly quizTakesService: QuizTakesService) {}

  @Mutation(() => QuizTake)
  createQuizTake(@Args('createQuizTakeInput') createQuizTakeInput: CreateQuizTakeInput) {
    return this.quizTakesService.create(createQuizTakeInput);
  }

  @Query(() => [QuizTake], { name: 'quizTakes' })
  findAll() {
    return this.quizTakesService.findAll();
  }

  @Query(() => QuizTake, { name: 'quizTake' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.quizTakesService.findOne(id);
  }

  @Mutation(() => QuizTake)
  updateQuizTake(@Args('updateQuizTakeInput') updateQuizTakeInput: UpdateQuizTakeInput) {
    return this.quizTakesService.update(updateQuizTakeInput.id, updateQuizTakeInput);
  }

  @Mutation(() => QuizTake)
  removeQuizTake(@Args('id', { type: () => Int }) id: number) {
    return this.quizTakesService.remove(id);
  }
}
