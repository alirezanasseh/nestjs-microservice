import { Module } from '@nestjs/common';
import { CqrsController } from './cqrs.controller';
import { CqrsService } from './cqrs.service';
import { PrismaService } from './db/prisma.service';

@Module({
  imports: [],
  controllers: [CqrsController],
  providers: [CqrsService, PrismaService],
  exports: [PrismaService],
})
export class CqrsModule {}
