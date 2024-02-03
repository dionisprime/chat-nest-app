import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Message } from '../message/message.schema';
import { User } from '../user/user.schema';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
  @ApiProperty({
    description: 'Name of the chat',
    example: 'Fun Chat',
    required: true,
  })
  @Prop({ required: true, unique: true })
  chatname: string;

  @ApiProperty({
    type: () => Message,
    description: 'Messages in the chat',
    isArray: true,
    default: [],
  })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  })
  messages: Message[];

  @ApiProperty({
    type: () => User,
    description: 'Users in the chat',
    isArray: true,
    default: [],
  })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  users: User[];
}
export const ChatSchema = SchemaFactory.createForClass(Chat);
