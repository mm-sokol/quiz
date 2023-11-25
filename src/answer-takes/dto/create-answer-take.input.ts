import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAnswerTakeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
