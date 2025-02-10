import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { RegisterDto } from './dto/register.dto';
import { AuthReturnDto } from './dto/auth-return.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserContext } from './decorators/user.decorator';
import { UserType } from '../types/user.type';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  usersUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.usersUrl =
      this.configService.get<string>('USERS_SERVICE_URL') ||
      'http://users:3000';
    if (this.usersUrl === '') {
      throw new Error('Could not find users service');
    }
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.httpService.axiosRef
      .post<AuthReturnDto>(this.usersUrl + '/register', registerDto)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        throw new Error('Could not register user');
      });
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const response = await this.httpService.axiosRef.post<AuthReturnDto>(
      this.usersUrl + '/auth/login',
      loginDto,
    );
    return response.data;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@UserContext() user: UserType) {
    return user;
  }
}
