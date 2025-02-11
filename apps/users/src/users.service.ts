import { Injectable } from '@nestjs/common';
import { PrismaService } from './db/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async register(data: RegisterDto) {
    const { name, email, password } = data;

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      throw new Error('User already exists');
    }

    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
