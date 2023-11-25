import { CreateQuizTakeInput } from './create-quiz-take.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateQuizTakeInput extends PartialType(CreateQuizTakeInput) {
  @Field(() => Int)
  id: number;
}
