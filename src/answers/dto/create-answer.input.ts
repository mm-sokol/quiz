import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class CreateAnswerInput {

  @Field(() => ID)
  id: number;

  @Field()
  contents: string;

  @Field(() => Int)
  @Min(0, { message: 'CorrectStatus must be greater than or equal to 0' })
  correctStatus: number;
}

@InputType()
export class CreateAnswerFullInput {

  @Field(() => ID)
  id: number;

  @Field()
  contents: string;

  @Field(() => Int)
  @Min(0, { message: 'CorrectStatus must be greater than or equal to 0' })
  correctStatus: number;

  @Field(() => Int)
  questionId: number;
}
