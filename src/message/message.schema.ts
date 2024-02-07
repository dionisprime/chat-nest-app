import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop()
  text: string;

  @Prop()
  creator: string;

  @Prop()
  chat: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
