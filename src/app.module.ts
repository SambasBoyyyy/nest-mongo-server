import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './module/user/user.module';
import { ClientModule } from './module/clients/client.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './module/courses/courses.module';
import { ChatsModule } from './module/chats/chats.module';
import { DetectionModule } from './module/detection/detection.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/mydatabase', {
      dbName: "mydatabase",
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ClientModule,
    AuthModule,
    CoursesModule,
    ChatsModule,
    DetectionModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
