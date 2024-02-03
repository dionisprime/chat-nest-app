import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './user/dto/create-user.dto';

@Injectable()
export class AppService {
  constructor(@Inject('CHAT_SERVICE') private chatClient: ClientProxy) {}

  getAllUsers() {
    return this.chatClient.send({ cmd: 'getAllUsers' }, '');
  }

  getUserById(id: string) {
    return this.chatClient.send({ cmd: 'getUser' }, id);
  }

  postUser(createUserDto: CreateUserDto) {
    return this.chatClient.send({ cmd: 'createUser' }, createUserDto);
  }

  getChatById(id: string) {
    return this.chatClient.send({ cmd: 'getChat' }, id);
  }

  getMessageById(id: string) {
    return this.chatClient.send({ cmd: 'getMessage' }, id);
  }

  getUserEvent(id: string) {
    return this.chatClient.emit('user:test', id);
  }
}
