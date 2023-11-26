import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Question } from 'src/questions/entities/question.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('answers')
export class Answer {

  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  contents: string;

  @Column()
  @Field(() => Int)
  correctStatus: number;

  @Column()
  @Field(() => Int)
  questionId: number;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;
}
