import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  text: string;
  @ApiProperty()
  creator: string;
  @ApiProperty()
  chat: string;
  @ApiProperty({ default: Date.now() })
  created: Date;
  @ApiProperty()
  read: Date;
}
