import { Test, TestingModule } from '@nestjs/testing';
import { QuestionTakesResolver } from './question-takes.resolver';
import { QuestionTakesService } from './question-takes.service';

describe('QuestionTakesResolver', () => {
  let resolver: QuestionTakesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionTakesResolver, QuestionTakesService],
    }).compile();

    resolver = module.get<QuestionTakesResolver>(QuestionTakesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
