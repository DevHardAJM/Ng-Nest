import { Injectable } from '@nestjs/common';
import * as faker from 'faker/locale/fr';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
  private readonly users: any[];
  constructor() {
    this.users = new Array(10)
      .fill(1)
      .map((e, i) => {
        return {
          id: i + 1,
          name : faker.name.findName(),
          email : faker.internet.email(),
        };
      });
  }
  
  getAll() {
    return this.users;
  }
  
  getUserById(userId: number) {
    return this.users.find(e => e.id === Number(userId));
  }
  
  removeUser(userId) {
    let userIndex = this.users.findIndex(e => e.id == userId);
    this.users.splice(userIndex, 1);
    return userIndex;
  }
  
  addUser(createUserDto: CreateUserDto) {
    const user = {
      id: this.generateId(),
      name: createUserDto.name,
      email: createUserDto.email,
    };
    this.users.push(user);
    return user;
  }

  updateUser(userId: number,createUserDto: CreateUserDto) {
    const userIndex = this.users.findIndex(e => e.id == userId);
    if (userIndex>-1) {
      this.users[userIndex].name=createUserDto.name;
      this.users[userIndex].email=createUserDto.email;
    }
    return this.users[userIndex];
  }
  
  private generateId() {
    return this.users.length > 0 ?
      Math.max(...this.users.map(e => e.id)) + 1 :
      1;
  }
}
