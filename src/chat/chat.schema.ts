import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

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
    description: 'Users in the chat',
    isArray: true,
    default: [],
  })
  @Prop({ required: true })
  users: string[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
