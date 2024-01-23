import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { Message } from './message.schema';
import { Connection } from 'mongoose';

@Injectable()
export class MessageService {
  private messageModel;

  constructor(@InjectConnection('messages') private connection: Connection) {
    this.messageModel = this.connection.model(Message.name);
  }

  create(createMessageDto: CreateMessageDto) {
    return this.messageModel.create(createMessageDto);
  }

  findAll() {
    return this.messageModel.find();
  }

  async findOne(id: string) {
    const message = await this.messageModel.findById(id);
    if (!message) {
      throw new Error(`Message with ${id} not found`);
    }
    return message;
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    const message = await this.messageModel.findById(id);
    if (!message) {
      throw new Error(`message with ${id} not found`);
    }
    message?.set(updateMessageDto);
    return message?.save();
  }

  async remove(id: string) {
    const message = await this.messageModel.findByIdAndDelete(id);
    if (!message) {
      throw new Error(`message with ${id} not found`);
    }
    return message;
  }
}
