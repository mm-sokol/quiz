import { Test, TestingModule } from '@nestjs/testing';
import { QuestionTakesService } from './question-takes.service';

describe('QuestionTakesService', () => {
  let service: QuestionTakesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionTakesService],
    }).compile();

    service = module.get<QuestionTakesService>(QuestionTakesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
