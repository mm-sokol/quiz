import { InputType, Field } from '@nestjs/graphql';
import { QuestionType } from '../entities/question.entity';

@InputType()
export class CreateQuestionInput {
  @Field()
  contents: string;

  @Field(() => QuestionType)
  type: QuestionType;
}
