import { Controller, Get } from '@nestjs/common';
import { CqrsService } from './cqrs.service';

@Controller()
export class CqrsController {
  constructor(private readonly cqrsService: CqrsService) {}

  @Get()
  getHello(): string {
    return this.cqrsService.getHello();
  }
}
