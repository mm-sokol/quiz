import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AnswersService } from './answers.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';

@Resolver(() => Answer)
export class AnswersResolver {
  constructor(private readonly answersService: AnswersService) {}

  @Mutation(() => Answer)
  createAnswer(@Args('createAnswerInput') createAnswerInput: CreateAnswerInput) {
    return this.answersService.create(createAnswerInput);
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
  updateAnswer(@Args('updateAnswerInput') updateAnswerInput: UpdateAnswerInput) {
    return this.answersService.update(updateAnswerInput.id, updateAnswerInput);
  }

  @Mutation(() => Answer)
  removeAnswer(@Args('id', { type: () => Int }) id: number) {
    return this.answersService.remove(id);
  }
}
