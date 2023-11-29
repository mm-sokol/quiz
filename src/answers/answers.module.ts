import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersResolver } from './answers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { DataSourceProvider } from 'src/db/data-source.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  providers: [AnswersResolver, AnswersService, DataSourceProvider],
  exports: [AnswersService]
})
export class AnswersModule {}
