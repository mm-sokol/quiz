import { CreateAnswerFullInput, CreateAnswerInput } from './create-answer.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAnswerInput extends PartialType(CreateAnswerInput) {
}

@InputType()
export class UpdateAnswerFullInput extends PartialType(CreateAnswerFullInput) {
}

