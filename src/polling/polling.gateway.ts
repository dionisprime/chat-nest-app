import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { PollingService } from './polling.service';

@WebSocketGateway()
export class PollingGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor(private readonly pollingService: PollingService) {}

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
    this.pollingService.setGatewayClient(server);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  sendToClients(msg) {
    this.server.emit('message', msg);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: CreateMessageDto) {
    this.pollingService.handleMessage(message);
  }
}
