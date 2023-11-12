import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuizesService } from './quizes.service';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizeInput } from './dto/create-quiz.input';
import { UpdateQuizeInput } from './dto/update-quiz.input';

@Resolver(() => Quize)
export class QuizesResolver {
  constructor(private readonly quizesService: QuizesService) {}

  @Mutation(() => Quize)
  createQuize(@Args('createQuizeInput') createQuizeInput: CreateQuizeInput) {
    return this.quizesService.create(createQuizeInput);
  }

  @Query(() => [Quize], { name: 'quizes' })
  findAll() {
    return this.quizesService.findAll();
  }

  @Query(() => Quize, { name: 'quize' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.quizesService.findOne(id);
  }

  @Mutation(() => Quize)
  updateQuize(@Args('updateQuizeInput') updateQuizeInput: UpdateQuizeInput) {
    return this.quizesService.update(updateQuizeInput.id, updateQuizeInput);
  }

  @Mutation(() => Quize)
  removeQuize(@Args('id', { type: () => Int }) id: number) {
    return this.quizesService.remove(id);
  }
}
