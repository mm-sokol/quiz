import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should create a new user record and return that', async () => {
    const userInput = {
      username: 'rob_ot',
      firstname: 'Robert',
      lastname: 'Otto'
    };
    expect(await service.create(userInput)).toEqual({
      id: expect.any(Number),
      ...userInput
    });
  });

  

});
