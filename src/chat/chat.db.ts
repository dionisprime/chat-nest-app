import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './chat.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DB_CONNECTION_NAMES } from '../../db.connection.names';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_CONNECTION_STRING_CHATS'),
      }),
      connectionName: DB_CONNECTION_NAMES.chats,
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    MongooseModule.forFeature(
      [{ name: 'Chat', schema: ChatSchema }],
      DB_CONNECTION_NAMES.chats,
    ),
  ],
  providers: [ConfigService],
})
export class ChatDBModule {}
