import { Body, Controller, Post } from '@nestjs/common';
import { PollingService } from './polling.service';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { EventPattern } from '@nestjs/microservices';
import { eventName } from '../helpers/event.enum';

@Controller('polling')
export class PollingController {
  constructor(private readonly pollingService: PollingService) {}

  @Post('/createNewMessage')
  handleMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.pollingService.handleMessage(createMessageDto);
  }

  @EventPattern(eventName.sendMessage)
  sendMessage(createMessageDto: CreateMessageDto) {
    return this.pollingService.sendMessage(createMessageDto);
  }
}
