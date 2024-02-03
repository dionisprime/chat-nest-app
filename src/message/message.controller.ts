import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @EventPattern('createMessage')
  async create(@Payload() createMessageDto: CreateMessageDto) {
    const message = await this.messageService.create(createMessageDto);
    return message;
  }

  @EventPattern('getAllMessages')
  async findAll() {
    return await this.messageService.findAll();
  }

  @EventPattern('getMessageById')
  async findOne(@Payload() id: string) {
    return await this.messageService.findOne(id);
  }

  @EventPattern('updateMessage')
  async update(@Payload() updateMessageDto: UpdateMessageDto) {
    return await this.messageService.update(
      updateMessageDto.id,
      updateMessageDto,
    );
  }

  @EventPattern('removeMessage')
  async remove(@Payload() id: string) {
    return await this.messageService.remove(id);
  }
}
