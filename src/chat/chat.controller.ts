import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';
import { addMember } from './dto/addMember.dto';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/creator')
  create(
    @Body() createChatDto: CreateChatDto,
    @Param('userId') userId: string,
  ) {
    return this.chatService.create(createChatDto, userId);
  }

  @MessagePattern({ cmd: 'getUser' })
  checkMessage(id: string) {
    return this.chatService.getUserInChats(id);
  }

  @Post('addMember')
  async addMember(@Body() addMemberInChat: addMember) {
    return await this.chatService.addMember(addMemberInChat);
  }

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Get('id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(id);
  }

  @Delete(':id/member/:memberId')
  async removeMemberFromChat(
    @Param('chatId') id: string,
    @Param('memberId') memberId: string,
  ) {
    return await this.chatService.deleteMember(id, memberId);
  }
}
