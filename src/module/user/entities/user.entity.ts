import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Client } from 'src/module/clients/entities/client.entity';
import { Type } from '@nestjs/class-transformer';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class User {
  static firstName(firstName: any): (target: typeof import("../user.service").UserService, propertyKey: undefined, parameterIndex: 0) => void {
    throw new Error('Method not implemented.');
  }
  @Prop({
    type: String,
    unique: true,
    default: function genUUID() {
      return uuid();
    },
  })
  userId: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  img_url?: string;

  @Prop({ required: false })
  clientId?: string;

  @Type(() => Client)
  Client: Client;

  @Prop({ required: true })
  password: string;
  
  @Prop({
    type: [{ type: String}],
    default: [],
    unique: true,
  })
  courseID: string[]; 

  @Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('Client', {
  ref: Client.name,
  localField: 'clientId',
  foreignField: 'clientId',
  justOne: true,
});