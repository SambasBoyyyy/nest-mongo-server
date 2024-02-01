import { PartialType } from "@nestjs/mapped-types";
import { SignupUserDto } from "./create_user-dto";

export class UpdateRefreshDto extends PartialType(SignupUserDto) {}
export type TokenModel = {
    access_token: string;
    refresh_token: string;
  };
  
  export type SignInResponse = {
    id: number;
    first_name: string;
    last_name: string;
    image_url: string;
    email: string;
    access_token: string;
    refresh_token: string;
  };
  