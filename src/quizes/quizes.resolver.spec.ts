import { Test, TestingModule } from '@nestjs/testing';
import { QuizesResolver } from './quizes.resolver';
import { QuizesService } from './quizes.service';

describe('QuizesResolver', () => {
  let resolver: QuizesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizesResolver, QuizesService],
    }).compile();

    resolver = module.get<QuizesResolver>(QuizesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
