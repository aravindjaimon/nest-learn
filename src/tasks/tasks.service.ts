import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
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

  async getTask(filter: GetTasksFilterDTO, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filter, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });
    if (found) {
      console.log(found);
    }
    if (!found) throw new NotFoundException(`Task with id ${id} not found :)`);
    return found;
  }

  async createTask(body: CreateTaskDTO, user: User): Promise<Task> {
    return this.taskRepository.createTask(body, user);
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }

  async deleteTask(id: number, user: User) {
    const result = await this.taskRepository.delete({ id, userId: user.id });
    if (result.affected === 0)
      throw new NotFoundException(`Task with id ${id} not found :)`);
    else return result.affected;
  }
}
