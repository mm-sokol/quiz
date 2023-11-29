import { Test, TestingModule } from '@nestjs/testing';
import { DataSourceProvider } from './data-source.provider';
import { Provider } from '@nestjs/common';

describe('DataSourceProvider', () => {
  let provider: Provider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSourceProvider],
    }).compile();

    // provider = module.get<Provider>(DataSourceProvider);
  });
});
