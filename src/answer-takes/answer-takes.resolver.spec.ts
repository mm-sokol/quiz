import { Test, TestingModule } from '@nestjs/testing';
import { AnswerTakesResolver } from './answer-takes.resolver';
import { AnswerTakesService } from './answer-takes.service';

describe('AnswerTakesResolver', () => {
  let resolver: AnswerTakesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerTakesResolver, AnswerTakesService],
    }).compile();

    resolver = module.get<AnswerTakesResolver>(AnswerTakesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
