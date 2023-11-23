import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Quiz } from "src/quizes/entities/quiz.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AnswerAttempt } from "./answer-attempt.entity";


@ObjectType()
@Entity('quiz_attempts')
export class QuizAttempt {

    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field(() => Int)
    userId: number;

    @ManyToOne(()=>User, (user) => user.quizAttempts)
    user: User;

    @Column()
    @Field(() => Int)
    quizId: number;

    @ManyToOne(()=>Quiz, (quiz)=>quiz.solvingAttempts)
    quiz: Quiz;

    @OneToMany(()=>AnswerAttempt, (ansAttempt) => ansAttempt.quizAttempt)
    @Field(type => [AnswerAttempt], {nullable: true, defaultValue: []})
    givenAnswers: AnswerAttempt[];

    @Column({ type: 'timestamptz', nullable: true })
    completionDate: Date;

    @Column()
    @Field(() => Int)
    score: number;
}