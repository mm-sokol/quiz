import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AnswerTake {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
