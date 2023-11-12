import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

}
