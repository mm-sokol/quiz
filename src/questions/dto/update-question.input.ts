import {
  CreateQuestionFullInput,
  CreateQuestionInput,
} from './create-question.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateQuestionInput extends PartialType(CreateQuestionInput) {}

@InputType()
export class UpdateQuestionFullInput extends PartialType(
  CreateQuestionFullInput,
) {}
