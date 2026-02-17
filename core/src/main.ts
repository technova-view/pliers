import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Pliers: Core API')
    .setDescription('API documentation for Core service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  app.enableCors({
    origin: (origin, callback) => {
      callback(null, true); // allow all origins
    },
    credentials: true, // cookies work
  });

  app.setGlobalPrefix('api/v1');

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  const port = process.env.PORT || 5000;
  await app.listen(port);
  Logger.log(
    `Pliers backend core is running on: http://localhost:${port}/api`
  );
}

bootstrap();
