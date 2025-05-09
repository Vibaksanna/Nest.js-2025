import { Module } from '@nestjs/common';
import { TasksController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { UsersModule } from '../users/user.module'; // Import the UsersModule

@Module({
  // imports: [],
  // controllers: [TasksController],
  // providers: [TaskService],
  // exports: [],
  // Add any other necessary configurations or modules
  imports: [TypeOrmModule.forFeature([Task]), UsersModule],
  providers: [TaskService],
  controllers: [TasksController],
  
})
export class TaskModule {}
