import { InputType, Field, ID } from '@nestjs/graphql';
import { QuestionType } from '../entities/question.entity';
import { CreateAnswerInput } from 'src/answers/dto/create-answer.input';

@InputType()
export class CreateQuestionInput {
  @Field()
  contents: string;

  @Field(() => QuestionType)
  type: QuestionType;

  @Field(() => [CreateAnswerInput])
  answers: CreateAnswerInput[];
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
