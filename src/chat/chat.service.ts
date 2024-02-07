import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Connection } from 'mongoose';
import { Chat, ChatDocument } from './chat.schema';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { eventName } from '../helpers/event.enum';
import { ClientProxy } from '@nestjs/microservices';
import { REDIS_SERVICE } from '../redis.module';
import { ERROR_MESSAGE } from '../helpers/constants';

@Injectable()
export class ChatService {
  private chatModel;
  constructor(
    @InjectConnection('chat') private readonly connection: Connection,
    @Inject(REDIS_SERVICE) private redisClient: ClientProxy,
  ) {
    this.chatModel = this.connection.model<Chat>(Chat.name);
  }
  async create(createChatDto: CreateChatDto) {
    return await this.chatModel.create(createChatDto);
  }

  async findAll() {
    return await this.chatModel.find();
  }

  async findOne(id: string) {
    return await this.chatModel.findById(id);
  }

  async update(id: string, updateChatDto: UpdateChatDto) {
    return await this.chatModel.findByIdAndUpdate(id, updateChatDto);
  }

  async remove(id: string) {
    return await this.chatModel.findByIdAndDelete(id);
  }

  async deleteChatByTitle(title: string) {
    return await this.chatModel.deleteMany({ title });
  }

  async checkUser(createMessageDto: CreateMessageDto) {
    const chatId = createMessageDto.chat;
    const validUserOfChat = (await this.findOne(chatId)) as ChatDocument;
    if (
      validUserOfChat &&
      validUserOfChat.members.includes(createMessageDto.creator)
    ) {
      return createMessageDto;
    } else {
      throw new ForbiddenException(ERROR_MESSAGE.USER_ID);
    }
  }

  async sendValidMessage(createMessageDto: CreateMessageDto) {
    this.redisClient.emit(eventName.sendValidMessage, createMessageDto);
  }
}
