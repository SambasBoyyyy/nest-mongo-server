import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Client } from 'src/module/clients/entities/client.entity';
import { Double } from 'mongodb';

export type UserDocument = Course & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class Course {
 
  @Prop({
    type: String,
    unique: true,
    default: function genUUID() {
      return uuid();
    },
  })
  courseID: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  instructor: string;

  @Prop({ required: true})
  rating: Double;

  @Prop({ required: false })
  course_img_url?: string;

  @Prop({ required: false })
  description?: string;

  @Prop()
  duration: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.virtual('Client', {
  ref: Client.name,
  localField: 'clientId',
  foreignField: 'clientId',
  justOne: true,
});