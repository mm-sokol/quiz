import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository: Repository<User> ) {}

  create(createUserInput: CreateUserInput) {
    const user = this.userRepository.create(createUserInput);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneByOrFail({id});
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

  remove(id: number) {
    return this.userRepository.delete({id});
  }
}
