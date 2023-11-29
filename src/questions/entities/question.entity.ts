import { ObjectType, Field, ID, registerEnumType, Int } from '@nestjs/graphql';
import { Answer } from 'src/answers/entities/answer.entity';
// import { Quiz } from 'src/quizes/entities/quiz.entity';
import { Quiz } from 'src/internal';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum QuestionType {
  SINGLE_CHOICE = 0,
  MULTIPLE_CHOICE = 1,
  SORT_SQUENCE = 2,
  TEXT_ANSWER = 3,
}

registerEnumType(QuestionType, {
  name: 'QuestionType',
});

@ObjectType()
@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  contents: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  @Field(() => QuestionType)
  type: QuestionType;

  @Column({ nullable: true, default: null })
  @Field((type) => Int, { nullable: true, defaultValue: null })
  quizId?: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  @OneToMany(() => Answer, (answer) => answer.question)
  @Field((type) => [Answer], { nullable: true, defaultValue: [] })
  answers: Answer[];
}
