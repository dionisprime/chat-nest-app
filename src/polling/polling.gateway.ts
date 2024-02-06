import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PollingService } from './polling.service';

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

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  sendToClients(msg) {
    this.server.emit('message', msg);
  }

  @SubscribeMessage('ping')
  handlePing() {
    return {
      event: 'pong',
      data: 'pong data',
    };
  }
}
