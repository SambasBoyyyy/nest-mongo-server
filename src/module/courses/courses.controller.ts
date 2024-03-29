import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseDto } from './dto/coursedto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  
  
  @Post('add-coursesByadmin')
  async addCoursesToUser(@Body() AddCourse: CourseDto) {
    return await this.coursesService.addCourse(AddCourse);
  }

  @Get('all-courses')
  async AllCourses() {
    return await this.coursesService.AllCourse();
  }
}
