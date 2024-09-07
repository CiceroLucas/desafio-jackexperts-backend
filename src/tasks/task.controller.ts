import {
  Body,
  Controller,
  Post,
  Get,
  ValidationPipe,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './task.service';
import { TaskStatus } from './task.entity';
import { TaskStatusValidationPipe } from './pipes/TaskStatusValidation.pipe';
import { TaskDto } from './DTOs/task.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/users/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Post()
  create(@Body(ValidationPipe) task: TaskDto, @CurrentUser() user: UserEntity) {
    return this.service.create(task, user);
  }

  @Get()
  index(@CurrentUser() user: UserEntity) {
    return this.service.index(user);
  }

  @Patch(':id')
  updateStatus(
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @Param('id') id: number,
  ) {
    return this.service.updateStatus(id, status);
  }

  @Patch('update/:id')
  updateTask(@Body(ValidationPipe) task: TaskDto, @Param('id') id: number) {
    return this.service.updateTask(id, task);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @CurrentUser() user: UserEntity) {
    return this.service.delete(id, user);
  }
}
