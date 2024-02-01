import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [MongooseModule.forFeature(forFeatureDb),UserModule],
  exports: [ClientService],
})
export class ClientModule {}
