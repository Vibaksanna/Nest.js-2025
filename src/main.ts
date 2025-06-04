import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-execption.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));

  // Enable CORS
  app.enableCors();

  // Register the global HTTP exception filter
  // app.useGlobalFilters(new HttpExceptionFilter());

  // Start server
  await app.listen(process.env.PORT ?? 3100);

}
bootstrap();
