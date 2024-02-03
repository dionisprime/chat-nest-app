import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './user/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users')
  getAllUsers() {
    return this.appService.getAllUsers();
  }

  @Get('/users/:id')
  getUserById(@Param('id') userId: string) {
    return this.appService.getUserById(userId);
  }

  @Post('/users/')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.appService.postUser(createUserDto);
  }

  @Get('/chats/:id')
  getChatById(@Param('id') chatId: string) {
    return this.appService.getChatById(chatId);
  }

  @Get('/messages/:id')
  getMessageById(@Param('id') messageId: string) {
    return this.appService.getMessageById(messageId);
  }

  @Get('/event/user/:id')
  getUserEvent(@Param('id') messageId: string) {
    return this.appService.getUserEvent(messageId);
  }
}
