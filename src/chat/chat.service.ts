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

  async findAll() {
    const chat = await this.chatModel.find();
    return chat;
  }

  async update(
    id: string,
    updateChatDto: UpdateChatDto,
  ): Promise<ChatDocument> {
    const chat = await this.chatModel.findById(id);
    if (!chat) {
      throw new Error(`Chat with ${id} not found`);
    }
    chat?.set(updateChatDto);
    return chat?.save();
  }

  async remove(id: string) {
    const chat = await this.chatModel.findByIdAndDelete(id);
    if (!chat) {
      throw new Error(`User with ${id} not found`);
    }
    return chat;
  }
}
