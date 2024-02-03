import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PollingService } from './polling.service';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { UpdateMessageDto } from 'src/message/dto/update-message.dto';

@Controller()
export class PollingController {
  constructor(private readonly pollingService: PollingService) {}

  @Post('/messages')
  postMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.pollingService.postMessage(createMessageDto);
  }

  @Get('/messages/:id')
  getMessageById(@Param('id') messageId: string) {
    return this.pollingService.getMessageById(messageId);
  }

  @Get('/messages')
  getAllMessages() {
    return this.pollingService.getAllMessages();
  }

  @Patch('/messages/:id')
  updateMessage(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    updateMessageDto.id = id;
    return this.pollingService.updateMessage(updateMessageDto);
  }

  @Delete('/messages/:id')
  removeMessage(@Param('id') id: string) {
    return this.pollingService.removeMessage(id);
  }
}
