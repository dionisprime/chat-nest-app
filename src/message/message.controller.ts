import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @EventPattern('message:test')
  handleUserGet() {
    console.log(`from message`);
    return `from message`;
  }

  @MessagePattern({ cmd: 'getMessage' })
  async handleMessageGet(id: string) {
    console.log(`you ask for message: ${id}`);
    const message = await this.messageService.findOne(id);
    return message;
  }

  @MessagePattern('createMessage')
  create(@Payload() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @MessagePattern('findAllMessage')
  findAll() {
    return this.messageService.findAll();
  }

  @MessagePattern('findOneMessage')
  findOne(@Payload() id: string) {
    return this.messageService.findOne(id);
  }

  @MessagePattern('updateMessage')
  update(@Payload() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(updateMessageDto.id, updateMessageDto);
  }

  @MessagePattern('removeMessage')
  remove(@Payload() id: string) {
    return this.messageService.remove(id);
  }
}
