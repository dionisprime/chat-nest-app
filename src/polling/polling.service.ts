import { Inject, Injectable } from '@nestjs/common';
import { REDIS_SERVICE } from '../redis.module';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Subject } from 'rxjs';

@Injectable()
export class PollingService {
  private gatewayEvents = new Subject<{ event: string; data: unknown }>();
  constructor(@Inject(REDIS_SERVICE) private redisClient: ClientProxy) {}

  handleMessage(createMessageDto: CreateMessageDto) {
    this.redisClient.emit('createdMessage', createMessageDto);
  }

  getEvents() {
    return this.gatewayEvents;
  }

  sendMessage(createMessageDto: CreateMessageDto) {
    this.gatewayEvents.next({ event: 'message', data: createMessageDto });
  }
}
