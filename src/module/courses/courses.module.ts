import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
  imports:[MongooseModule.forFeature(forFeatureDb), MulterModule.register({}),]
})
export class CoursesModule {}
