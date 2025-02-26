import { NestFactory } from '@nestjs/core';
import { CqrsModule } from './cqrs.module';

async function bootstrap() {
  const app = await NestFactory.create(CqrsModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
