export type UpdateUserDto = {
    id: string;
    first_name: string;
    last_name: string;
    image_url: string;
    email: string;
    refreshToken?: string;
  };

  
  export type UpdateUserResponse = {
    
    first_name: string;
    last_name: string;
    image_url: string;
    email: string;
  
  };