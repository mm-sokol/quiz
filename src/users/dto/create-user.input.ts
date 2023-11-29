import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';
import { UserRole } from '../entities/user.entity';

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

  @Field((type) => UserRole, { nullable: true, defaultValue: UserRole.STUDENT })
  role?: UserRole;
}
