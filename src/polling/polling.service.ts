import { Inject, Injectable } from '@nestjs/common';
import { REDIS_SERVICE } from '../redis.module';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Server } from 'socket.io';

@Injectable()
export class PollingService {
  private gateway: Server;

  constructor(@Inject(REDIS_SERVICE) private redisClient: ClientProxy) {}

  handleMessage(createMessageDto: CreateMessageDto) {
    this.redisClient.emit('createdMessage', createMessageDto);
  }

  setGatewayClient(client: Server) {
    this.gateway = client;
  }

  sendMessage(createMessageDto: CreateMessageDto) {
    this.gateway.emit('message', createMessageDto);
  }
}
