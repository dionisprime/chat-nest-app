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
    this.messageModel = this.connection.model(Message.name);
  }

  async create(message: CreateMessageDto) {
    const messageCreated = await this.messageModel.create(message);
    this.redisClient.emit(eventName.messageCreated, messageCreated);
    return messageCreated;
  }

  async findAll() {
    return await this.messageModel.find();
  }

  async findOne(id: string) {
    return await this.messageModel.findById(id);
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    const updateMessage = await this.messageModel.findByIdAndUpdate(
      id,
      updateMessageDto,
    );
    return updateMessage;
  }

  async handleMessageField(Read: { chatId: string; messageId: string }) {
    const { messageId } = Read;

    const message = await this.messageModel.findByIdAndUpdate(
      messageId,
      {
        read: Date.now(),
      },
      { new: true },
    );
    this.redisClient.emit(eventName.updatedFieldOfMessage, message);
    console.log(eventName.updatedFieldOfMessage);
  }

  async remove(id: string) {
    return await this.messageModel.findByIdAndDelete(id);
  }

  async deleteMessageByText(text: string) {
    return await this.messageModel.deleteMany({ text });
  }
}
