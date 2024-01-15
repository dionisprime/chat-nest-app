import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatDBModule } from './chat.db';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CHAT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
    ChatDBModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
