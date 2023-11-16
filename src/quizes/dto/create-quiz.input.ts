import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuizInput {
  
  @Field({description: 'Title of the quiz'})
  title: string;

}
