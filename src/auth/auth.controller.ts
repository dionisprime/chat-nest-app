import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger/dist';
import { AuthDto, AuthSocketDto } from './dto/auth.dto';

@ApiTags('auth-check')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() authDto: AuthDto) {
    const token = this.authService.generateToken(authDto);
    return token;
  }

  @Post('/tokenForSocket')
  async tokenSocket(@Body() authSocketDto: AuthSocketDto) {
    const tokenSocket = this.authService.generateTokenForSocket(authSocketDto);
    return tokenSocket;
  }
}
