import { BadRequestException, Injectable } from '@nestjs/common';
import { CourseDto } from './dto/coursedto';
import { Course, CourseDocument } from './entities/course.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService {
    
    constructor(@InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>) {}
    
    async addCourse(courseDto: CourseDto): Promise<any> {
      
       
      const res = this.courseModel.create(courseDto);
         return res;
      }
    
        
    

}
