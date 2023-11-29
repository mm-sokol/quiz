import { Test, TestingModule } from '@nestjs/testing';
import { QuizTakesService } from './quiz-takes.service';

describe('QuizTakesService', () => {
  let service: QuizTakesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizTakesService],
    }).compile();

    service = module.get<QuizTakesService>(QuizTakesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
