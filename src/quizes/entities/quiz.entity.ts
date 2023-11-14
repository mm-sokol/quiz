import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'quizes'})
@ObjectType()
export class Quiz {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column()
  @Field()
  title: string;

  // @ManyToOne(() => User, (user) => user.quizes)
  // @Field((type) => User)
  // author: User;
}
