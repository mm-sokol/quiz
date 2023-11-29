import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Quiz } from 'src/quizes/entities/quiz.entity';
// import { Quiz } from 'src/internal';

import { User } from 'src/users/entities/user.entity';
// import { User } from 'src/internal';

import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('quiz_takes')
export class QuizTake {
  
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field(() => Int)
  quizId: number;

  @Column()
  @Field(() => Int)
  userId: number;

  @Column({nullable: true, default: 0})
  @Field(() => Int, {nullable: true, defaultValue: 0})
  score: number;

  @CreateDateColumn()
  @Field()
  date: Date;

  @ManyToOne(() => Quiz, (quiz) => quiz.takes)
  quiz: Quiz;

  @ManyToOne(() => User, (user) => user.quizTakes)
  user: User;

}
