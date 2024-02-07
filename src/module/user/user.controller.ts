import { Body, Controller, Delete, Get, Param, Post, Res, UploadedFile, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { BaseResponse } from 'src/base_response';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update_user_dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { UserChooseCourse } from './dto/ChooseCourse_dto';
import { UserRemoveCourse } from './dto/remove_course_dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
 
  // @Get(':id')
  //   async getAllPost(@Param() params) {
          
  //       const user = await this.userService.findById(params.id);
  //       const response ={
  //         data:user,
  //         status:200,
  //         message:'success'

  //       }

  //       return response;
  //   }


  @UseGuards(AccessTokenGuard)
  @Post(':userId/add-courses')
  async addCoursesToUser(@Param('userId') userId: string,@Body() ChooseCourse: UserChooseCourse, // Expecting an array of course IDs in the request body
  ) {
    return await this.userService.addCourses(userId, ChooseCourse);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':userId/remove-courses')
  async deleteCourses(@Param('userId') userId: string,@Body() RemoveCourse: UserRemoveCourse, // Expecting an array of course IDs in the request body
  ) {
    return await this.userService.deleteCourses(userId, RemoveCourse);
  }

  
  @UseGuards(AccessTokenGuard)
  @Post('update/:id')
  async updateUser(@Body() UpdateUserDto: UpdateUserDto,@Param() params) {
    UpdateUserDto.id = params.id;
    const response: BaseResponse = {
      data: await this.userService.update_user(UpdateUserDto),
      message: 'success',
      status: 201,
    };
    return response;
  }

  @UseGuards(AccessTokenGuard)
  @Delete('delete/:id')
  async delete_user(@Param() params) {
  
    const response: BaseResponse = {
      data: await this.userService.DeleteById(params.id),
      message: 'success',
      status: 201,
    };
    return response;
  }


  @UseGuards(AccessTokenGuard)
  @Get(':userId/image')
 async getUserImage(@Param('userId') userId: string, @Res() res: Response): Promise<void> {
 const user = await this.userService.findUserById(userId);
 console.log(user.img_url)
  if (!user.img_url) {
    res.status(404).send('Image not found');
  }
  return res.sendFile(user.img_url, { root: 'uploads/images' });
}

}
export { UploadedFile };

