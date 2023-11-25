import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionTakesService } from './question-takes.service';
import { QuestionTake } from './entities/question-take.entity';
import { CreateQuestionTakeInput } from './dto/create-question-take.input';
import { UpdateQuestionTakeInput } from './dto/update-question-take.input';

@Resolver(() => QuestionTake)
export class QuestionTakesResolver {
  constructor(private readonly questionTakesService: QuestionTakesService) {}

  @Mutation(() => QuestionTake)
  createQuestionTake(@Args('createQuestionTakeInput') createQuestionTakeInput: CreateQuestionTakeInput) {
    return this.questionTakesService.create(createQuestionTakeInput);
  }

  @Query(() => [QuestionTake], { name: 'questionTakes' })
  findAll() {
    return this.questionTakesService.findAll();
  }

  @Query(() => QuestionTake, { name: 'questionTake' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.questionTakesService.findOne(id);
  }

  @Mutation(() => QuestionTake)
  updateQuestionTake(@Args('updateQuestionTakeInput') updateQuestionTakeInput: UpdateQuestionTakeInput) {
    return this.questionTakesService.update(updateQuestionTakeInput.id, updateQuestionTakeInput);
  }

  @Mutation(() => QuestionTake)
  removeQuestionTake(@Args('id', { type: () => Int }) id: number) {
    return this.questionTakesService.remove(id);
  }
}
