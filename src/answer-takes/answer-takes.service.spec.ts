import { Test, TestingModule } from '@nestjs/testing';
import { AnswerTakesService } from './answer-takes.service';

describe('AnswerTakesService', () => {
  let service: AnswerTakesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerTakesService],
    }).compile();

    service = module.get<AnswerTakesService>(AnswerTakesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
