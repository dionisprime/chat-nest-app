import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Connection } from 'mongoose';
import { Chat } from './chat.schema';

@Injectable()
export class ChatService {
  private chatModel;
  constructor(
    @InjectConnection('chat') private readonly connection: Connection,
  ) {
    this.chatModel = this.connection.model(Chat.name);
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
}
