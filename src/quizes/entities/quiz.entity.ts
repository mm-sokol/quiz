import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Question } from 'src/questions/entities/question.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'quizes'})
@ObjectType()
export class Quiz {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column()
  @Field()
  title: string;

  @OneToMany(() => Question, (question) => question.quiz)
  @Field(type => [Question], {nullable: true, defaultValue: []})
  questions: Question[];
}
