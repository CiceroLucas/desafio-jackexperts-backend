import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/task.module';

import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.MYSQL_CONNECTION,
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_DOCKER_PORT,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      entities: ['dist/**/*.entity.js'],
      database: process.env.MYSQL_DATABASE,
      synchronize: true,
    } as TypeOrmModuleOptions),
    TasksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
