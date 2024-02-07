import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RedisModule } from '../redis.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../helpers/mail.service';

@Module({
  imports: [RedisModule, PassportModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategy, ConfigService, MailService],
})
export class AuthModule {}
