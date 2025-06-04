import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity'; // adjust the path if needed

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new user
  async createUser(body: Partial<User>) {

    // Validate if the user already exists
    const existingUser = await this.userRepository.findOne({ where: { username: body.username } });

    if (existingUser) {
      throw new ConflictException(`User with username ${body.username} already exists`);
    }


    const user = this.userRepository.create(body);
    return await this.userRepository.save(user);
  }

  // Get a user by username (include related tasks if any)
  async getUser(id: number) {
    return await this.userRepository.findOne({
      where: { id: id },
      relations: ['tasks'], // if you have a 'tasks' relation
    });
  }

  // Update a user by username
  async updateUser(username: string, body: Partial<User>) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) return null;
    Object.assign(user, body);
    return await this.userRepository.save(user);
  }

  // Delete a user by username
  async deleteUser(username: string) {
    return await this.userRepository.delete({ username });
  }

  // Optional: Get all users
  async getAllUsers() {
    return await this.userRepository.find({ relations: ['tasks'] });
  }

  // Find user by ID and throw if not found
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
