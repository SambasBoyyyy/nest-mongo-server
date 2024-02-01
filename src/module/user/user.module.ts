import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import forFeatureDb from 'src/db/for-feature.db';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [MongooseModule.forFeature(forFeatureDb), MulterModule.register({}),],
  exports: [UserService],
})
export class UserModule {}
