import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuizTakeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
