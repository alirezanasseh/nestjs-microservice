import { NestFactory } from '@nestjs/core';
import { SagaModule } from './saga.module';

async function bootstrap() {
  const app = await NestFactory.create(SagaModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
