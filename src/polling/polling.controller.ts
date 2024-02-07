import { Controller } from '@nestjs/common';
import { PollingService } from './polling.service';
import { EventPattern } from '@nestjs/microservices';
import { eventName } from '../helpers/event.enum';
import { Message } from '../message/message.schema';

@Controller('polling')
export class PollingController {
  constructor(private readonly pollingService: PollingService) {}

  @EventPattern(eventName.messageCreated)
  sendMessage(message: Message) {
    this.pollingService.sendMessage(message);
  }

  @EventPattern(eventName.updatedFieldOfMessage)
  readMessage(message: Message) {
    console.log(eventName.updatedFieldOfMessage);
    this.pollingService.sendUpdatedMessage(message);
  }
}
