import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Quiz } from 'src/quizes/entities/quiz.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
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
