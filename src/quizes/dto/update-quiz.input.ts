import { CreateQuizeInput } from './create-quiz.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateQuizeInput extends PartialType(CreateQuizeInput) {
  @Field(() => Int)
  id: number;
}
