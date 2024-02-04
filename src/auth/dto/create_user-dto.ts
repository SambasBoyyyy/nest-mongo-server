import { IsEmail, IsNotEmpty, IsPassportNumber, IsStrongPassword } from "class-validator";

export class SignupUserDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty()
  @IsStrongPassword()
  // 'minLength' | 'minLowercase' | 'minUppercase' | 'minNumbers' | 'minSymbols'
  password: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  img_url?:string;
  refreshToken?: string;
    }

  