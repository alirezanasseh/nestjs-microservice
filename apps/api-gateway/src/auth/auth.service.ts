import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserType } from '@app/shared-types';
import { JwtPayloadType } from '../types/jwt-payload.type';
import { HttpService } from '@nestjs/axios';
import { RegisterDto, LoginDto } from '@app/shared-types';
import { AuthReturnDto } from './dto/auth-return.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  usersUrl: string;

  constructor(
    private readonly jwtService: JwtService,
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

  generateToken(user: UserType) {
    const payload: JwtPayloadType = { sub: user.id, user };
    return this.jwtService.sign(payload);
  }

  async register(data: RegisterDto) {
    return this.httpService.axiosRef
      .post<AuthReturnDto>(this.usersUrl + '/register', data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        throw new Error('Could not register user');
      });
  }

  async login(data: LoginDto) {
    const response = await this.httpService.axiosRef.post<AuthReturnDto>(
      this.usersUrl + '/login',
      data,
    );
    return response.data;
  }
}
