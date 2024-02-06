import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
  @Prop()
  title: string;

  @Prop()
  members: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
