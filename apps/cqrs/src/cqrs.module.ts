import { Module } from '@nestjs/common';
import { CqrsController } from './cqrs.controller';
import { CqrsService } from './cqrs.service';

@Module({
  imports: [],
  controllers: [CqrsController],
  providers: [CqrsService],
})
export class CqrsModule {}
