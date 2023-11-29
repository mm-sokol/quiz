import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRole } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(user => Promise.resolve({id: Date.now(), ...user}))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository
        }
      ],
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
      lastname: 'Otto',
      role: UserRole.STUDENT
    };
    expect(await service.create(userInput)).toEqual({
      id: expect.any(Number),
      ...userInput
    });
  });

  

});
