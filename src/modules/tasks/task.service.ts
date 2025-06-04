import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity'; // adjust path as needed
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  // Create a new task
  async createTask(body: CreateTaskDto) {
    const task = this.taskRepository.create(body);
    return await this.taskRepository.save(task);
  
  }

  // Get one task by ID
  async getTask(id: number) {
    return await this.taskRepository.findOne({
      where: { id },
      relations: ['user'], // if Task has a relation to User
    });
  }

  // Update a task by ID
  async updateTask(id: number, body: Partial<Task>) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) return null;
    Object.assign(task, body);
    return await this.taskRepository.save(task);
  }

  // Delete a task by ID
  async deleteTask(id: number) {
    return await this.taskRepository.delete(id);
  }

  // Optional: Get all tasks
  async getAllTasks() {
    return await this.taskRepository.find({ relations: ['user'] });
  }

  // Find one task by ID with error handling
  async findOne(id: number): Promise<Task> {
  const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }
}
