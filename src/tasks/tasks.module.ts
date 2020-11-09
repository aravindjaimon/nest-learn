import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskReposiory } from './task.repositry';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskReposiory])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
