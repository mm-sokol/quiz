import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  const mockUserService = {
    create: jest.fn(input => {
      return {
        id: Date.now(),
        ...input
      }
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver,UsersService],
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
      username: "ally032",
      firstname: "Ally",
      lastname: "Leigh"
    };
    expect(resolver.createUser(input)).toEqual({
      id: expect.any(Number),
      username: input.username,
      firstname: input.firstname,
      lastname: input.lastname
    });

    expect(mockUserService.create).toHaveBeenCalled();
  })
});
