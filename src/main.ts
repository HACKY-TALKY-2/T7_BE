import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('HACKY TOCKY API')
    .setDescription('API for HACKY-TOKCY service')
    .setVersion('1.0')
    .build();

  const docs = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, docs);

  await app.listen(3000);
}
bootstrap();
