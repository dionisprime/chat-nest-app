import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  phoneNumber: number;

  @ApiProperty()
  email: string;
}

export class AuthSocketDto {
  @ApiProperty()
  name: string;
}
