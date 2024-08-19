import { PrismaService } from './prisma/prisma.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as next from 'next';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);

  // await prismaService.enableShutdownHooks(app);

  app.enableCors({
    origin: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  });

  await app.listen(8080);
}
bootstrap();
