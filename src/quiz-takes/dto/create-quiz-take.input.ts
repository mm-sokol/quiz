import { Int, Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class CreateQuizTakeInput {

  @Field(() => Int)
  quizId: number;

  @Field(() => Int)
  userId: number;

  @Field(() => [QuestionInput])
  givenAnswers: QuestionInput[];

}

@InputType()
export class QuestionInput {

  @Field(() => ID)
  questionId: number;

  @Field()
  text?: string;

  @Field(() => [ID])
  correctAnswers?: number[];

  @Field(() => [SortingInput])
  sortedAnswers?: SortingInput[];
}

@InputType()
export class SortingInput {
  
  @Field(() => Int)
  answerId: number;

  @Field(() => Int)
  orderingNumber: number;
}
