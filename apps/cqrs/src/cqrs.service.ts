import { Injectable } from '@nestjs/common';

@Injectable()
export class CqrsService {
  getHello(): string {
    return 'Hello World!';
  }
}
