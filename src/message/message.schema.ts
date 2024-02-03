import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @ApiProperty({
    description: 'Id of creator',
    required: true,
  })
  @Prop({ required: true })
  createdBy: string;

  @ApiProperty({
    description: 'Id of chat',
    required: true,
  })
  @Prop({ required: true })
  chatId: string;

  @ApiProperty({
    description: 'Text of the message',
    example: 'Lorem ipsum dolor',
    required: true,
  })
  @Prop({ required: true })
  text: string;

  @ApiProperty({
    description: 'Date of message creation in timestamp',
    example: '1705309971834',
    required: true,
  })
  @Prop({ required: true })
  date: Date;
}
export const MessageSchema = SchemaFactory.createForClass(Message);
