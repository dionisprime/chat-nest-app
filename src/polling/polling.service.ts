import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { UpdateMessageDto } from 'src/message/dto/update-message.dto';

@Injectable()
export class PollingService {
  constructor(@Inject('CHAT_SERVICE') private client: ClientProxy) {}

  postMessage(createMessageDto: CreateMessageDto) {
    return this.client.emit('createMessage', createMessageDto);
  }

  getAllMessages() {
    return this.client.emit('getAllMessages', '');
  }

  getMessageById(id: string) {
    return this.client.emit('getMessage', id);
  }

  updateMessage(updateMessageDto: UpdateMessageDto) {
    return this.client.emit('updateMessage', updateMessageDto);
  }

  removeMessage(id: string) {
    return this.client.emit('removeMessage', id);
  }
}
