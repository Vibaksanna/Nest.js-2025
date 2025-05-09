import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity'; // Adjust the path if needed

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  // Get a task by ID
  @Get('/:id')
  getTask(@Param('id') id: string) {
    return this.taskService.getTask(Number(id));
  }

  // Get all tasks
  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  // Create a new task
  @Post()
  createTask(@Body() body: Partial<Task>) {
    return this.taskService.createTask(body);
  }

  // Mark task as done
  // @Patch('/:id')
  // async markTaskAsDone(@Param('id') id: string) {
  //   return this.taskService.updateTask(Number(id), { completedAt: new Date() });
  // }

  // Mark task as pending (clear completedAt)
  @Patch('/:id')
  async markTaskAsPending(@Param('id') id: string, @Body() body: Partial<Task>) {
    return this.taskService.updateTask(Number(id), body);
  }

  // Delete a task
  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(Number(id));
  }
}
