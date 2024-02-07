import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Connection } from 'mongoose';
import { Message } from './message.schema';
import { REDIS_SERVICE } from '../redis.module';
import { ClientProxy } from '@nestjs/microservices';
import { eventName } from '../helpers/event.enum';

@Injectable()
export class MessageService {
  private messageModel;
  constructor(
    @InjectConnection('message') private readonly connection: Connection,
    @Inject(REDIS_SERVICE) private redisClient: ClientProxy,
  ) {
    this.messageModel = this.connection.model<Message>(Message.name);
  }
  create(message: CreateMessageDto) {
    const createdMessage = new this.messageModel(message);
    return createdMessage.save();
  }

  async checkMessage(createMessageDto: CreateMessageDto) {
    this.redisClient.emit(eventName.checkMessage, createMessageDto);
  }

  async send(message: Message) {
    this.redisClient.emit(eventName.sendMessage, message);
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
