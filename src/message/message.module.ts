import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageDBModule } from './message.db';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MessageDBModule, ConfigModule.forRoot()],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
