import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuizesService } from './quizes.service';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizeInput } from './dto/create-quiz.input';
import { UpdateQuizeInput } from './dto/update-quiz.input';

@Resolver(() => Quiz)
export class QuizesResolver {
  constructor(private readonly quizesService: QuizesService) {}

  @Mutation(() => Quiz)
  createQuize(@Args('createQuizeInput') createQuizeInput: CreateQuizeInput) {
    return this.quizesService.create(createQuizeInput);
  }

  @Query(() => [Quiz], { name: 'quizes' })
  findAll() {
    return this.quizesService.findAll();
  }

  @Query(() => Quiz, { name: 'quize' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.quizesService.findOne(id);
  }

  @Mutation(() => Quiz)
  updateQuize(@Args('updateQuizeInput') updateQuizeInput: UpdateQuizeInput) {
    return this.quizesService.update(updateQuizeInput.id, updateQuizeInput);
  }

  @Mutation(() => Quiz)
  removeQuize(@Args('id', { type: () => Int }) id: number) {
    return this.quizesService.remove(id);
  }
}
