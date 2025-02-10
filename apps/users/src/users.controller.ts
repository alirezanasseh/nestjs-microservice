import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register() {
    return this.usersService.register();
  }

  @Get()
  getHello(): string {
    return this.usersService.getHello();
  }
}
