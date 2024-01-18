import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { Connection } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  private userModel;
  constructor(
    @Inject('CHAT_SERVICE') private chatClient: ClientProxy,
    @InjectConnection('user') private connection: Connection,
  ) {
    this.userModel = this.connection.model(User.name);
  }

  sayHi() {
    return this.chatClient.send('sayHi', 'Hello from chat');
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
