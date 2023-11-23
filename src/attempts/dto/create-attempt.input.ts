import { Field, InputType, Int } from "@nestjs/graphql";


@InputType()
export class CreateAnswerAttemptInput {
    @Field(()=>Int)
    questionId: number;

    @Field(()=>Int)
    answerId?: number;

    @Field()
    contents: string;
}

@InputType()
export class CreateAttemptInput {
    @Field(() => Int)
    userId: number;

    @Field(() => Int)
    quizId: number;
}
