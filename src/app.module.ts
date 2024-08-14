import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', '..', 'frontend', 'build'),
  }), PrismaModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
