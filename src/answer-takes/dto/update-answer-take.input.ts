import { CreateAnswerTakeInput } from './create-answer-take.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAnswerTakeInput extends PartialType(CreateAnswerTakeInput) {
  @Field(() => Int)
  id: number;
}
