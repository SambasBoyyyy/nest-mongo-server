import { Body, Controller, Post, Req } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  
  @Post('add-coursesByadmin')
  async addCoursesToUser(@Req() req: Request, @Body() ChooseCourse: UserChooseCourse) {
    const userId = req['userId'];
    return await this.userService.addCourses(userId, ChooseCourse);
  }
}
