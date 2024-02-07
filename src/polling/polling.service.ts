import { Inject, Injectable } from '@nestjs/common';
import { REDIS_SERVICE } from '../redis.module';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Subject } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from './helpers/auth.class';
import { ConfigService } from '@nestjs/config';
import { eventName } from '../helpers/event.enum';

@Injectable()
export class PollingService {
  private gatewayEvents = new Subject<{ event: string; data: unknown }>();
  constructor(
    @Inject(REDIS_SERVICE) private redisClient: ClientProxy,
    private configService: ConfigService,
  ) {}

  handleMessage(createMessageDto: CreateMessageDto) {
    this.redisClient.emit(eventName.createMessage, createMessageDto);
  }

  handleConnection(token: string) {
    const secret = this.configService.get<string>('JWT_SECRET')!;
    const payload = jwt.verify(token, secret) as JwtPayload;
    return payload;
  }

  getEvents() {
    return this.gatewayEvents;
  }

  sendMessage(createMessageDto: CreateMessageDto) {
    this.gatewayEvents.next({
      event: eventName.message,
      data: createMessageDto,
    });
  }
}
