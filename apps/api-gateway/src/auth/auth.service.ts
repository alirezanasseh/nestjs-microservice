import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UserType } from '../types/user.type';
import { JwtPayloadType } from '../types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await argon2.verify(hashedPassword, password);
  }

  generateToken(user: UserType) {
    const payload: JwtPayloadType = { sub: user.id, user };
    return this.jwtService.sign(payload);
  }
}
