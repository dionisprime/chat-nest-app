import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'getUser' })
  async handleUserGet(id: string) {
    console.log(`you ask for user: ${id}`);
    const user = await this.userService.findOne(id);
    return user;
  }

  @EventPattern('user:test')
  async handleUserEvent(id: string) {
    console.log(`There is event that asking for user: ${id}`);
    return 'user:' + id;
  }

  @MessagePattern('createUser')
  async handleUserPost(@Payload() createUserDto: CreateUserDto) {
    console.log('');
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @MessagePattern('getAllUsers')
  async handleUserGetAll() {
    console.log(`you ask for all users`);
    const users = await this.userService.findAll();
    return users;
  }

  @Post()
  create(@Body() createChatDto: CreateUserDto) {
    return this.userService.create(createChatDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
