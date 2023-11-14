import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Quiz } from 'src/quizes/entities/quiz.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  STUDENT = 'S',
  TEACHER = 'T'
}

@Entity({name: 'users'})
@ObjectType()
export class User {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
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
  @Field((type) => UserRole, {
    nullable: true, 
    defaultValue: UserRole.STUDENT})
  role: UserRole;

  // @OneToMany(() => Quiz, (quiz) => quiz.author)
  // @Field(() => [Quiz], {nullable: true, defaultValue: null})
  // quizes: Quiz[]

}
