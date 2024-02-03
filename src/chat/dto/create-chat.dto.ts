import { User } from '../../user/user.schema';
import { Message } from '../../message/message.schema';

export class CreateChatDto {
  chatname: string;
  messages: Message[];
  users: User[];
}
