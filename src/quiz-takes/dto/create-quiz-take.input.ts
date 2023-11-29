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

  @Field({nullable: true})
  text?: string;

  @Field(() => Int, {nullable: true})
  correctAnswerId?: number; 

  @Field(() => [Int], {nullable: true})
  correctAnswers?: number[];

  @Field(() => [Int], {nullable: true})
  sortedAnswers?: number[];
}
