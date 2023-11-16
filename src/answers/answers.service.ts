import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerFullInput } from './dto/create-answer.input';
import { UpdateAnswerFullInput } from './dto/update-answer.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AnswersService {

  constructor(
    @InjectRepository(Answer) private readonly answersRepository: Repository<Answer>,
    @Inject('DataSourceProvider') private readonly dataSource: DataSource
  ) {}

  async create(createAnswerInput: CreateAnswerFullInput) {
    const queryRunner = this.dataSource.createQueryRunner();
    const answerRepository = queryRunner.manager.getRepository(Answer);
    await queryRunner.startTransaction();
    try {
      const answer = answerRepository.create(createAnswerInput);
      let saved = answerRepository.save(answer);

      await queryRunner.commitTransaction();
      return saved;
    } catch(error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return this.answersRepository.find({relations: ['question']});
  }

  findOne(id: number) {
    const answer = this.answersRepository.findOne({where: {id}, relations: ['question']});
    if (!answer) {
      throw new NotFoundException(`Answer of id: ${id} not found.`);
    }
    return answer;
  }

  async update(id: number, updateAnswerInput: UpdateAnswerFullInput) {
    const queryRunner = this.dataSource.createQueryRunner();
    const answerRepository = queryRunner.manager.getRepository(Answer);
    await queryRunner.startTransaction();
    try {
      const updated = await answerRepository.update(id, updateAnswerInput);
      if (updated.affected === 0) {
        throw new NotFoundException(`Answer with id: ${id} not found. Cannot update.`);
      }
      const answer = answerRepository.findOneBy({id});

      await queryRunner.commitTransaction();
      return answer;
    } catch(error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    const answerRepository = queryRunner.manager.getRepository(Answer);

    await queryRunner.startTransaction();
    try {
      const toRemove = await answerRepository.findOneBy({id});
      if(!toRemove) {
        throw new NotFoundException(`Answer with id: ${id} not found.`);
      }
      const removed = answerRepository.remove(toRemove);
      await queryRunner.commitTransaction();
      return removed;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
