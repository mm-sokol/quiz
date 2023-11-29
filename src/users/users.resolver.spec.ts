import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User, UserRole } from './entities/user.entity';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  const mockUserService = {
    create: jest.fn((createDto) => {
      return {
        id: Date.now(),
        ...createDto,
      };
    }),

    update: jest.fn((id, updateDto) => {
      return {
        id,
        ...updateDto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver, UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a User', () => {
    const input = {
      username: 'ally032',
      firstname: 'Ally',
      lastname: 'Leigh',
    };
    expect(resolver.createUser(input)).toEqual({
      id: expect.any(Number),
      username: input.username,
      firstname: input.firstname,
      lastname: input.lastname,
      role: UserRole.STUDENT,
      quizTakes: [],
    });
    expect(mockUserService.create).toHaveBeenCalled();
  });

  it('should update a User', () => {
    const input = {
      username: 'parrot',
      firstname: 'Zenon',
      lastname: 'Zen',
      role: UserRole.TEACHER,
      quizTakes: [],
    };
    expect(resolver.updateUser(3, input)).toEqual({
      id: 3,
      ...input,
    });
    expect(mockUserService.update).toHaveBeenCalled();
  });
});
