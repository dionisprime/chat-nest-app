import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { MessageService } from '../message.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CreatorMessageGuard implements CanActivate {
  constructor(
    private readonly messageService: MessageService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    const { messageId } = request.params;

    const userId = await this.getUserIdFromToken(token);
    const creatorId = await this.messageService.handleCreatorOfChat(userId);
    const message = await this.messageService.findOne(messageId);
    const admin = await this.messageService.handleGetAdminChat(
      message.chat,
      userId,
    );
    if (userId === creatorId || message.author === userId || admin) {
      return true;
    }
    throw new UnauthorizedException('You are not a creator of message');
  }

  getUserIdFromToken(_id: string) {
    const secret = this.configService.get('JWT_SALT');
    const decodedToken = this.jwtService.verify(_id, { secret });
    console.log(decodedToken);
    return decodedToken._id;
  }
}
