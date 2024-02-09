import { Body, Controller, Delete, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { BaseResponse } from 'src/base_response';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update_user_dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { UserChooseCourse } from './dto/ChooseCourse_dto';
import { UserRemoveCourse } from './dto/remove_course_dto';


@Controller('user')
@UseGuards(AccessTokenGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add-courses')
  async addCoursesToUser(@Req() req: Request, @Body() ChooseCourse: UserChooseCourse) {
    const userId = req['userId'];
    return await this.userService.addCourses(userId, ChooseCourse);
  }

  @Delete('remove-courses')
  async deleteCourses(@Req() req: Request, @Body() RemoveCourse: UserRemoveCourse) {
    const userId = req['userId'];
    return await this.userService.deleteCourses(userId, RemoveCourse);
  }

  @Post('update')
  async updateUser(@Body() UpdateUserDto: UpdateUserDto, @Req() req: Request) {
    UpdateUserDto.id = req['userId'];
    const response: BaseResponse = {
      data: await this.userService.update_user(UpdateUserDto),
      message: 'success',
      status: 201,
    };
    return response;
  }

  @Delete('delete')
  async delete_user(@Req() req: Request) {
    const userId = req['userId'];
    const response: BaseResponse = {
      data: await this.userService.DeleteById(userId),
      message: 'success',
      status: 201,
    };
    return response;
  }

  @Get('profile-image')
  async getUserImage(@Req() req: Request, @Res() res: Response): Promise<void> {
    const userId = req['userId'];
    const user = await this.userService.findUserById(userId);
    console.log(user.img_url);
    if (!user.img_url) {
      res.status(404).send('Image not found');
    }
    return res.sendFile(user.img_url, { root: 'uploads/images' });
  }
}
