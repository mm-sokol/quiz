import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuizeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
