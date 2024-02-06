import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthDto, AuthSocketDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generateToken({ phoneNumber, email }: AuthDto) {
    const secret = this.configService.get('JWT_SALT');
    const token = this.jwtService.sign({ phoneNumber, email }, { secret });
    return token;
  }

  generateTokenForSocket({ name }: AuthSocketDto) {
    const secret = this.configService.get('JWT_PEPPER');
    const token = this.jwtService.sign({ name }, { secret });
    return token;
  }
}
