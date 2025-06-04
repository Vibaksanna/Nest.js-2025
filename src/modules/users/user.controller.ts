import {
  Get,
  Param,
  Controller,
  Post,
  Body,
  Patch,
  UsePipes,
  ValidationPipe,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getUser(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }

  // Get all users
  @Get('/')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  

  @Post('')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Patch('/:username')
  updateUser(@Param('username') username: string,
    @Body() body: { username: string; email: string; password: string },
  ) {
    return this.userService.updateUser(username,body);
  }

  @Delete('/:username')
  deleteUser(@Param('username') username: string) {
    return this.userService.deleteUser(username);
  }
}
