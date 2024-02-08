import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Connection } from 'mongoose';
import { Message } from './message.schema';
import { REDIS_SERVICE } from '../redis.module';
import { ClientProxy } from '@nestjs/microservices';
import { eventName } from '../helpers/event.enum';
import { lastValueFrom } from 'rxjs';

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
    const createdMessage = await this.messageModel.create(message);
    this.redisClient.emit(eventName.messageCreated, createdMessage);
    return createdMessage;
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

  async handleMessageRead(Read: { chatId: string; messageId: string }) {
    const { messageId } = Read;

    const message = await this.messageModel.findByIdAndUpdate(
      messageId,
      {
        read: Date.now(),
      },
      { new: true },
    );
    this.redisClient.emit(eventName.updatedReadOfMessage, message);
  }

  async handleCreatorOfChat(userId: string) {
    const creatorChat = this.redisClient.send({ cmd: 'getCreator' }, userId);
    const chat = await lastValueFrom(creatorChat);
    return chat;
  }

  async handleGetAdminChat(chatId: string, userId: string) {
    const user = { chatId, userId };
    const checkAdmin = this.redisClient.send({ cmd: 'checked Admin' }, user);
    const chatAdmin = await lastValueFrom(checkAdmin);
    return chatAdmin;
  }

  async remove(id: string) {
    return await this.messageModel.findByIdAndDelete(id);
  }

  async deleteMessageByText(text: string) {
    return await this.messageModel.deleteMany({ text });
  }
}
