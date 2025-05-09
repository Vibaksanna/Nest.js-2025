import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  // imports: [],
  // controllers: [UsersController],
  // providers: [UserService],
  // exports: [],
  // Add any other necessary configurations or modules
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UsersController],
  exports: [TypeOrmModule],

})
export class UserModule {}
export class UsersModule {}
