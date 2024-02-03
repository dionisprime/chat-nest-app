import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DB_CONNECTION_NAMES } from '../../db.connection.names';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_CONNECTION_STRING_USERS'),
      }),
      connectionName: DB_CONNECTION_NAMES.users,
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    MongooseModule.forFeature(
      [{ name: 'User', schema: UserSchema }],
      DB_CONNECTION_NAMES.users,
    ),
  ],
  providers: [ConfigService],
})
export class UserDBModule {}
