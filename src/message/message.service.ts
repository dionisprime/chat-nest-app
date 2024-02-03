import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Message, MessageDocument } from './message.schema';

@Injectable()
export class MessageService {
  private readonly messageModel;

  constructor(@InjectConnection('messages') private connection: Connection) {
    this.messageModel = this.connection.model<MessageDocument>(Message.name);
  }

  async create(createMessageDto: CreateMessageDto): Promise<MessageDocument> {
    const message = await new this.messageModel(createMessageDto).save();
    return message;
  }

  async findOne(id: string) {
    const message = await this.messageModel.findById(id);
    if (!message) {
      throw new Error(`Message with ${id} not found`);
    }
    return message;
  }

  async findAll() {
    return await this.messageModel.find();
  }

  async update(
    id: string,
    updatemessageDto: UpdateMessageDto,
  ): Promise<MessageDocument> {
    const message = await this.messageModel.findById(id);
    if (!message) {
      throw new Error(`message with ${id} not found`);
    }
    message?.set(updatemessageDto);
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
