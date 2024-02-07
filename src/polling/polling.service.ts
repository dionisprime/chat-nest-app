import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { REDIS_SERVICE } from '../redis.module';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Subject, lastValueFrom } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { eventName } from '../helpers/event.enum';
import { JwtPayload } from './helpers/auth.class';
import { ERROR_MESSAGE } from 'src/helpers/constants';
import { Read } from '../helpers/exportsConstructions';
import { Message } from '../message/message.schema';

@Injectable()
export class PollingService {
  private gatewayEvents = new Subject<{ event: string; data: any }>();
  constructor(
    @Inject(REDIS_SERVICE) private redisClient: ClientProxy,
    private configService: ConfigService,
  ) {}

  sendMessage(message: Message) {
    this.gatewayEvents.next({ event: eventName.message, data: message });
  }

  handleMessage(message: CreateMessageDto, chats: string[]) {
    const { chat } = message;
    const accessUser = chats.includes(chat);
    if (accessUser) {
      return this.redisClient.emit(eventName.messageReceived, message);
    } else {
      throw new ForbiddenException(ERROR_MESSAGE.ACCESS_ERROR);
    }
  }

  handleConnection(token: string) {
    const secret = this.configService.get<string>('JWT_SECRET')!;
    const payload = jwt.verify(token, secret) as JwtPayload;
    return payload;
  }

  async getChatsFromUser(userId: string) {
    const requestUserChat = this.redisClient.send({ cmd: 'getUser' }, userId);
    return await lastValueFrom(requestUserChat);
  }

  async updatedMessageRead(Read: Read) {
    this.redisClient.emit('read', Read);
  }

  sendUpdatedMessage(message: Message) {
    this.gatewayEvents.next({ event: 'read', data: message });
  }

  getEvents() {
    return this.gatewayEvents;
  }
}
