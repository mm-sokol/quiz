import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AnswerTakesService } from './answer-takes.service';
import { AnswerTake } from './entities/answer-take.entity';
import { CreateAnswerTakeInput } from './dto/create-answer-take.input';
import { UpdateAnswerTakeInput } from './dto/update-answer-take.input';

@Resolver(() => AnswerTake)
export class AnswerTakesResolver {
  constructor(private readonly answerTakesService: AnswerTakesService) {}

  @Mutation(() => AnswerTake)
  createAnswerTake(@Args('createAnswerTakeInput') createAnswerTakeInput: CreateAnswerTakeInput) {
    return this.answerTakesService.create(createAnswerTakeInput);
  }

  @Query(() => [AnswerTake], { name: 'answerTakes' })
  findAll() {
    return this.answerTakesService.findAll();
  }

  @Query(() => AnswerTake, { name: 'answerTake' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.answerTakesService.findOne(id);
  }

  @Mutation(() => AnswerTake)
  updateAnswerTake(@Args('updateAnswerTakeInput') updateAnswerTakeInput: UpdateAnswerTakeInput) {
    return this.answerTakesService.update(updateAnswerTakeInput.id, updateAnswerTakeInput);
  }

  @Mutation(() => AnswerTake)
  removeAnswerTake(@Args('id', { type: () => Int }) id: number) {
    return this.answerTakesService.remove(id);
  }
}
