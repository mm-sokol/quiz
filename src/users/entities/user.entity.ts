import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { QuizAttempt } from 'src/attempts/entities/quiz-attempt.entity';
import { Quiz } from 'src/quizes/entities/quiz.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  STUDENT = 'S',
  TEACHER = 'T'
}

registerEnumType(UserRole, {
  name: 'UserRole'
});

@Entity({name: 'users'})
@ObjectType()
export class User {

  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({unique: true})
  @Field()
  username: string;

  @Column()
  @Field()
  firstname: string;

  @Column()
  @Field()
  lastname: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT
  })
  @Field(() => UserRole, {
    nullable: true, 
    defaultValue: UserRole.STUDENT})
  role: UserRole;

  @OneToMany(() => QuizAttempt, (attempt) => attempt.user)
  @Field(() => [QuizAttempt], {nullable: true, defaultValue: null})
  quizAttempts: QuizAttempt[]

}
