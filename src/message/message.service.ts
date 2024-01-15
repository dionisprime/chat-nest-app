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
    return 'This action adds a new message';
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
