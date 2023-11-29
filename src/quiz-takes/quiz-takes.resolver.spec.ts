import { Test, TestingModule } from '@nestjs/testing';
import { QuizTakesResolver } from './quiz-takes.resolver';
import { QuizTakesService } from './quiz-takes.service';

describe('QuizTakesResolver', () => {
  let resolver: QuizTakesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizTakesResolver, QuizTakesService],
    }).compile();

    resolver = module.get<QuizTakesResolver>(QuizTakesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
