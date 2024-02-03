import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './message.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DB_CONNECTION_NAMES } from '../../db.connection.names';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_CONNECTION_STRING_MESSAGES'),
      }),
      connectionName: DB_CONNECTION_NAMES.messages,
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    MongooseModule.forFeature(
      [{ name: 'Message', schema: MessageSchema }],
      DB_CONNECTION_NAMES.messages,
    ),
  ],
  providers: [ConfigService],
})
export class MessageDBModule {}
