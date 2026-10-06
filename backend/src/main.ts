import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar CORS para o Next.js
  app.enableCors({ origin: '*' });
  await app.listen(3001);
  console.log(`Backend ERP Hospitalar rodando na porta 3001`);
}
bootstrap();
