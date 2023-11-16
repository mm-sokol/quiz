import { InputType, Field, ID } from '@nestjs/graphql';
import { QuestionType } from '../entities/question.entity';

@InputType()
export class CreateQuestionInput {
  @Field()
  contents: string;

  @Field(() => QuestionType)
  type: QuestionType;
}

@InputType()
export class CreateQuestionFullInput {
  @Field()
  contents: string;

  @Field(() => QuestionType)
  type: QuestionType;

  @Field(() => ID)
  quizId: number;
}
