import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TaskReposiory } from './task.repositry';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskReposiory]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
