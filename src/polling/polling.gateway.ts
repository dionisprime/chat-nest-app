import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PollingService } from './polling.service';
import { AuthSocket } from './helpers/auth.class';
import { CreateMessageDto } from '../message/dto/create-message.dto';

@WebSocketGateway()
export class PollingGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor(private readonly pollingService: PollingService) {}

  afterInit(server: Server) {
    console.log('Websocket Gateway initialized');
    this.pollingService.getEvents().subscribe({
      next: ({ event, data }) => {
        server.emit(event, data);
      },
    });
  }

  handleConnection(client: AuthSocket) {
    console.log(`Client connected: ${client.id}`);
    const token = client.handshake.auth.token;
    try {
      const user = this.pollingService.handleConnection(token);
      client.user = user;
    } catch (e) {
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  sendToClients(msg) {
    this.server.emit('message', msg);
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() createMessageDto: CreateMessageDto,
  ) {
    console.log('message from', client.user);
    this.pollingService.handleMessage(createMessageDto);
  }

  @SubscribeMessage('ping')
  handlePing() {
    return {
      event: 'pong',
      data: 'pong data',
    };
  }
}
