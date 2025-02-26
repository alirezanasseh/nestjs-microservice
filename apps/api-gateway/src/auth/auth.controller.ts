import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RegisterDto, LoginDto } from '@app/shared-types';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserContext } from '../decorators/user.decorator';
import { UserType } from '../types/user.type';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  usersUrl: string;

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@UserContext() user: UserType) {
    return user;
  }
}
