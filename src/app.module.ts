import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { PollingModule } from './polling/polling.module';
import { RedisModule } from './redis.module';
import { AuthModule } from './auth/auth.module';
import { JwtGuard } from './helpers/jwt.guard';
import { APP_GUARD } from '@nestjs/core';

const globalGuard = {
  provide: APP_GUARD,
  useClass: JwtGuard,
};

@Module({
  imports: [
    RedisModule,
    UserModule,
    ChatModule,
    MessageModule,
    PollingModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, globalGuard],
})
export class AppModule {}
