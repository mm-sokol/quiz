import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class QuizTake {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
