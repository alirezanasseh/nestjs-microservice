import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PrismaService } from './db/prisma.service';

@Module({
  imports: [],
  controllers: [PaymentsController],
  providers: [PaymentsService, PrismaService],
  exports: [PrismaService],
})
export class PaymentsModule {}
