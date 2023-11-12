import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @IsAlpha()
  @Field()
  firstname: string;

  @IsAlpha()
  @Field()
  lastname: string;
}
