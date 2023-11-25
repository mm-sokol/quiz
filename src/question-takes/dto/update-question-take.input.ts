import { CreateQuestionTakeInput } from './create-question-take.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateQuestionTakeInput extends PartialType(CreateQuestionTakeInput) {
  @Field(() => Int)
  id: number;
}
