import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeLevelColumn } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status-enum';
import { Task } from './task.entity';
import { TaskReposiory } from './task.repositry';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskReposiory)
    private taskRepository: TaskReposiory,
  ) {}

  async getTask(filter: GetTasksFilterDTO): Promise<Task[]> {
    return this.taskRepository.getTasks(filter);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) throw new NotFoundException(`Task with id ${id} not found :)`);
    return found;
  }

  async createTask(body: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(body);
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }

  async deleteTask(id: number) {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Task with id ${id} not found :)`);
    else return result.affected;
  }
}
