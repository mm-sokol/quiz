import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export enum QuestionType {
  SINGLE_CHOICE = 0,
  MULTIPLE_CHOICE = 1,
  SORT_SQUENCE = 2,
  TEXT_ANSWER = 3
};

registerEnumType(QuestionType, {
  name: 'QuestionType'
});


@ObjectType()
export class Question {

  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  contents: string;

  @Column({
    type: 'enum',
    enum: QuestionType
  })
  @Field(() => QuestionType)
  type: QuestionType;

}
