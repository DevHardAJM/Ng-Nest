import { Body,Put, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers(): any {
    return this.usersService.getAll();
  }

  @Get(':userId')
  getUser(@Param('userId') userId): any {
    const user = this.usersService.getUserById(userId);
    if (!user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
      return this.usersService.addUser(createUserDto);
  }

  @Put(':userId')
  updateUser(@Param('userId') userId:number,@Body() createUserDto: CreateUserDto): any {
    return this.usersService.updateUser(userId,createUserDto);
  }

  @Delete(':userId')
  removeUser(@Param('userId') userId): any {
    return this.usersService.removeUser(userId);
  }
}
