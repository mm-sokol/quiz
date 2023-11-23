import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateAnswerAttemptInput, CreateAttemptInput } from './dto/create-attempt.input';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizAttempt } from './entities/quiz-attempt.entity';

@Injectable()
export class AttemptsService {

    constructor(
        @InjectRepository(QuizAttempt) private readonly attemptRepository: Repository<QuizAttempt>,
        @Inject('DataSourceProvider') private readonly dataSource: DataSource 
    ) {}

    attemptQuiz(
        userId: number,
        quizId: number,
        attemptedQuiz: CreateAttemptInput,
        answers: CreateAnswerAttemptInput[]
    ) {

    }

    getUserAttempts(
        userId: number
    ) {
        const userAttempts = this.attemptRepository.findBy({userId});
        if (!userAttempts) {
            throw new NotFoundException(`User with id: ${userId} doesn't have quiz attempts`);
        }
        return userAttempts;
    }

    getQuizAttempts(
        quizId: number
    ) {
        const quizAttempts = this.attemptRepository.findBy({quizId});
        if (!quizAttempts) {
            throw new NotFoundException(`Quiz with id: ${quizId} doesn't have user attempts`);
        }
        return quizAttempts;
    }
}
