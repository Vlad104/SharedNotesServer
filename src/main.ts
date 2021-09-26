import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/LoggingInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.enableCors({
    origin: process.env.ORIGIN_URL,
    allowedHeaders: [
      'Access-Control-Allow-Credentials',
      'Access-Control-Request-Private-Network',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  app.use(cookieParser());
  await app.listen(4000);
}
bootstrap();
