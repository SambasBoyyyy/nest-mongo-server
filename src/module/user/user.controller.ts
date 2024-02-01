import { Body, Controller, Delete, Get, Param, Post, Res, UploadedFile, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupUserDto } from '../../auth/dto/create_user-dto';
import { LoginUserDto } from '../../auth/dto/login_user_dto';
import { BaseResponse } from 'src/base_response';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { UpdateUserDto } from './dto/update_user_dto';
import { AccessTokenGuard } from 'src/common/accessToken.guard';

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

