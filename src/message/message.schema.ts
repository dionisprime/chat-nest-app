import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.schema';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @ApiProperty({
    type: () => User,
    description: 'Id of creator',
    required: true,
  })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    required: true,
  })
  createdBy: User;

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
