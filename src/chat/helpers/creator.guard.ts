import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ChatService } from '../chat.service';

@Injectable()
export class ChatCreatorGuard implements CanActivate {
  constructor(private readonly chatService: ChatService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { chatId } = request.params;
    const { userId } = request.params;

    const chat = await this.chatService.findOne(chatId);
    if (chat.createdBy === userId) {
      return true;
    } else {
      throw new UnauthorizedException('You are not a creator of chat');
    }
  }
}
