import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QuizAttempt } from "./quiz-attempt.entity";
import { QuestionsModule } from "src/questions/questions.module";
import { Question } from "src/questions/entities/question.entity";
import { Answer } from "src/answers/entities/answer.entity";


@ObjectType()
@Entity('answer_attempt')
export class AnswerAttempt {

    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    
    @ManyToOne(()=>QuizAttempt, (quizAttempt) => quizAttempt.givenAnswers)
    quizAttempt: QuizAttempt;
    
    @Column()
    @Field(() => Int)
    questionId: number;

    @ManyToOne(()=>Question, (question)=>question.solvingAttempts)
    question: Question;

    @Column({nullable: true, default: null})
    @Field(() => Int)
    answerId: number;

    @ManyToOne(()=>Answer, (answer)=>answer.solvingAttempts)
    answer: Answer;

    @Column()
    @Field()
    contents: string;
}