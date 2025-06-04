import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  // Get a task by ID
  @Get('/:id')
  async getTask(@Param('id') id: string) {
    return await this.taskService.findOne(Number(id));
  }

  // Get all tasks
  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  // Create a new task with validation
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createTask(@Body() body: CreateTaskDto) {
    return this.taskService.createTask(body);
  }

  // Mark task as pending (or update any partial fields)
  @Patch('/:id')
  async markTaskAsPending(
    @Param('id') id: string,
    @Body() body: Partial<Task>,
  ) {
    return this.taskService.updateTask(Number(id), body);
  }

  // Delete a task
  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(Number(id));
  }
}
