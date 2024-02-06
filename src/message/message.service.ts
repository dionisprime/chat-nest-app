import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Connection } from 'mongoose';
import { Message } from './message.schema';
import { REDIS_SERVICE } from '../redis.module';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MessageService {
  private messageModel;
  constructor(
    @InjectConnection('message') private readonly connection: Connection,
    @Inject(REDIS_SERVICE) private redisClient: ClientProxy,
  ) {
    this.messageModel = this.connection.model(Message.name);
  }
  async create(createMessageDto: CreateMessageDto) {
    return await this.messageModel.create(createMessageDto);
  }

  async send(createMessageDto: CreateMessageDto) {
    this.redisClient.emit('send Message', createMessageDto);
  }

  async findAll() {
    return await this.messageModel.find();
  }

  async findOne(id: string) {
    return await this.messageModel.findById(id);
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    return await this.messageModel.findByIdAndUpdate(id, updateMessageDto);
  }

  async remove(id: string) {
    return await this.messageModel.findByIdAndDelete(id);
  }

  async deleteMessageByText(text: string) {
    return await this.messageModel.deleteMany({ text });
  }
}
