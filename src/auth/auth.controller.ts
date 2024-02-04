import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/create_user-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { LoginUserDto } from './dto/login_user_dto';
import { BaseResponse } from 'src/base_response';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

    @Post('signup')
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileInterceptor('image', {
      storage: diskStorage({
        destination: 'uploads/images',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }))
    signup(@Body() createUserDto: SignupUserDto,@UploadedFile() image: Express.Multer.File) {
      const imagePath = image ? image.filename : null;
      // const filePath = image.path.replace('assets\\profile_image\\', '');
   
  
         createUserDto.img_url=imagePath;
         return  this.authService.signUp(createUserDto);   
    }

    @Post('login')
    @UsePipes(ValidationPipe)
  async login(@Body() loginUserDto: LoginUserDto) {
    
    const response: BaseResponse = {
      data: await this.authService.signIn(loginUserDto),
      message: 'success',
      status: 201,
    };
    return response;
  }
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
  this.authService.logout(req.user['sub']);
}

@UseGuards(RefreshTokenGuard)
@Get('refresh')
refreshTokens(@Req() req: Request) {
  const userId = req.user['sub'];
  const refreshToken = req.user['refreshToken'];
  return this.authService.refreshTokens(userId, refreshToken);
}
  
}
