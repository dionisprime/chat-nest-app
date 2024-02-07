import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Connection } from 'mongoose';
import { Chat } from './chat.schema';
import { ClientProxy } from '@nestjs/microservices';
import { REDIS_SERVICE } from '../redis.module';

@Injectable()
export class ChatService {
  private chatModel;
  constructor(
    @InjectConnection('chat') private readonly connection: Connection,
    @Inject(REDIS_SERVICE) private redisClient: ClientProxy,
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

  async getUserInChats(id: string) {
    const chats = await this.chatModel
      .find({ members: id })
      .select('_id')
      .exec();
    const chatId = chats.map((chat) => chat._id.toString());
    return chatId;
  }
}
