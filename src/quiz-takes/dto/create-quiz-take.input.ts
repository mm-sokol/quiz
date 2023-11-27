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

  @Field(() => ID)
  correctAnswerId?: number; 

  @Field(() => [ID])
  correctAnswers?: number[];

  @Field(() => [ID])
  sortedAnswers?: number[];
}
