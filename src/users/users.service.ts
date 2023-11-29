import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @Inject('DataSourceProvider') private readonly dataSource: DataSource,
    @InjectRepository(User) private userRepository: Repository<User> ) {}

  async create(createUserInput: CreateUserInput) {
    const created = await this.dataSource.transaction(async manager => {
      try {
        const existing = await manager.findOneBy(User, {username: createUserInput.username});
        if (existing) {
          throw new BadRequestException('Username is already taken');
        }
        const user = manager.create(User, createUserInput);
        return manager.save(User, user);
        
      } catch (error) {
        throw new BadRequestException(`Transaction failed: ${error.message}`);
      }
    });
    return created;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOneByOrFail({id});
    }
    catch (error) {
      throw new HttpException(
        `Invalid request for user of id: ${id}.`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async update(id: number, updateUserInput: UpdateUserInput) {

    const { username } = updateUserInput;
    if (username) {
      const existingUser = this.userRepository.findOneBy({username})
      if (existingUser) {
        throw new HttpException(
          `Username: ${username} already exists. Cannot update.`,
          HttpStatus.BAD_REQUEST
        );
      }
    }

    const updateResult = await this.userRepository.update(id, updateUserInput);
    if ( updateResult.affected === 0 ) {
      throw new HttpException(
        `Thete is no user with id: ${id}. Cannot update.`,
        HttpStatus.BAD_REQUEST
      );
    }
    return this.userRepository.findOneByOrFail({id});
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({id});
    if (!user) {
      throw new HttpException(
        `Thete is no user with id: ${id}. Cannot delete.`,
        HttpStatus.BAD_REQUEST
      );
    }
    return this.userRepository.remove(user);
  }
}
