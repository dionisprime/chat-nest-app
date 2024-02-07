import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ApiTags } from '@nestjs/swagger';
import { EventPattern } from '@nestjs/microservices';
import { eventName } from '../helpers/event.enum';
import { CreateMessageDto } from '../message/dto/create-message.dto';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @EventPattern(eventName.checkMessage)
  async checkMessage(createMessageDto: CreateMessageDto) {
    const validMessage = await this.chatService.checkUser(createMessageDto);
    await this.chatService.sendValidMessage(validMessage);
  }

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(id);
  }

  @Patch(':id')
  update(@Param(':id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param(':id') id: string) {
    return this.chatService.remove(id);
  }
}
