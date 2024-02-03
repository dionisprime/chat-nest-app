import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { Chat, ChatDocument } from './chat.schema';
import { Connection } from 'mongoose';

@Injectable()
export class ChatService {
  private readonly chatModel;

  constructor(@InjectConnection('chats') private connection: Connection) {
    this.chatModel = this.connection.model<ChatDocument>(Chat.name);
  }

  async create(createChatDto: CreateChatDto): Promise<ChatDocument> {
    return await new this.chatModel(createChatDto).save();
  }

  async findOne(id: string) {
    const chat = await this.chatModel.findById(id);
    if (!chat) {
      throw new Error(`Chat with ${id} not found`);
    }
    return chat;
  }

  findAll() {
    return `This action returns all chat`;
  }

  update(id: string, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: string) {
    return `This action removes a #${id} chat`;
  }
}
