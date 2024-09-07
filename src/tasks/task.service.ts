import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity, TaskStatus } from './task.entity';
import { Repository } from 'typeorm';
import { TaskDto } from './DTOs/task.dto';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity) private repo: Repository<TaskEntity>,
  ) {}

  async create(data: TaskDto, user: UserEntity) {
    const task = this.repo.create({
      title: data.title,
      description: data.description,
      status: TaskStatus.OPEN,
      userId: user.id,
    });

    try {
      return this.repo.save(task);
    } catch (err) {
      throw new InternalServerErrorException('Failed to create task.');
    }
  }

  async index(user: UserEntity) {
    try {
      return await this.repo.find({ where: { userId: user.id } });
    } catch (err) {
      throw new InternalServerErrorException('Failed to retrieve tasks.');
    }
  }

  async updateStatus(id: number, status: TaskStatus) {
    const task = await this.repo.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    try {
      task.status = status;
      await this.repo.save(task);
      return task;
    } catch (err) {
      throw new InternalServerErrorException('Failed to update task.');
    }
  }

  async updateTask(id: number, data: TaskDto) {
    const task = await this.repo.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    try {
      task.title = data.title;
      task.description = data.description;
      await this.repo.save(task);
      return task;
    } catch (err) {
      throw new InternalServerErrorException('Failed to update task.');
    }
  }

  async delete(id: number, user: UserEntity) {
    const task = await this.repo.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    try {
      await this.repo.delete({ id, userId: user.id });
      return { message: `Task with ID ${id} deleted successfully.` };
    } catch (err) {
      throw new InternalServerErrorException('Failed to delete task');
    }
  }
}
