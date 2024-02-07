import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthDto, AuthSocketDto } from './dto/auth.dto';
import { MailService } from '../helpers/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
  ) {}

  generateToken({ _id, email, roles }: AuthDto) {
    const secret = this.configService.get('JWT_SALT');
    const token = this.jwtService.sign({ _id, email, roles }, { secret });
    return token;
  }

  generateTokenForSocket({ name }: AuthSocketDto) {
    const secret = this.configService.get('JWT_PEPPER');
    const token = this.jwtService.sign({ name }, { secret });
    return token;
  }

  generateLink(AuthDto: AuthDto) {
    const token = this.generateToken(AuthDto);
    const clientUrl = this.configService.get('CLIENT_URL');
    const link = `${clientUrl}/auth/${token}`;
    const html = `<p><a href="${link}">Enter in account</a></p>`;
    return html;
  }

  sendLink(AuthDto: AuthDto) {
    const htmlLink = this.generateLink(AuthDto);
    this.mailService.sendMessage({
      email: AuthDto.email,
      html: htmlLink,
      subject: 'Magic Link',
    });
  }
}
