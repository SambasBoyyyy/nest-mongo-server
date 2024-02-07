import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseResponse } from 'src/base_response';
import { SignInResponse, UpdateRefreshDto } from 'src/auth/dto/auth.dto';
import {  UpdateUserDto, UpdateUserResponse } from './dto/update_user_dto';
import { SignupUserDto } from 'src/auth/dto/create_user-dto';
import { LoginUserDto } from 'src/auth/dto/login_user_dto';
import { UserChooseCourse } from './dto/ChooseCourse_dto';
import { UserRemoveCourse } from './dto/remove_course_dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}
    
  async create(createUserDto: SignupUserDto) : Promise<UserDocument>{
    try {
      // const response: BaseResponse = {
      //   data: await this.userModel.create({ ...createUserDto }),
      //   message: "success",
      //   status: 201,
      // };
      // return response;
      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    } catch (error) {
      console.error("Error creating user:", error);
  
    const response: BaseResponse = {
        data:{},
        message: "Error creating user: " + error.message,
        status: 404,
      };
      // return response;
    }
  }

  async findUserById(userId: string){
    try {
       return await this.userModel.findOne({ userId: userId });
    
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findByUserEmail(email: string){
    try {
       return await this.userModel.findOne({ email: email });
    
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async DeleteById(userId: string){
    try {
      const confirmation = await this.userModel.deleteOne({ userId: userId }).exec();
    
      if (confirmation.deletedCount === 1) {
        return ("User deleted Successfully");
      } else {
        return ("No documents matched the query. Deleted 0 documents.");
      }
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
  
  async login(payload: LoginUserDto): Promise<SignInResponse> {

    let user = await this.userModel.findOne({ email: payload.email });
    // if (!user || !(await bcrypt.compare(payload.password, user.password))) {
    //   throw new BadRequestException('invalid email or password');
    // }

    if (!user || !((payload.password === user.password))) {
      throw new BadRequestException('invalid email or password');
    }

    //  const token = await this.generateToken(user);
    //  user.access_token = token.access_token;
    //  user.refresh_token = token.refresh_token;
    //  user = await this.userModel.save(user);
    // user.image_url = getProfileImageUrl(user.image_url); 
    const response: SignInResponse = {
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      image_url: '',//user.image_url,
      email: user.email,
      access_token: 'user.access_token',
      refresh_token: 'user.refresh_token',
    };

    return response;
  }

  async update_user(_payload: UpdateUserDto): Promise<UpdateUserResponse> {
   
    try {
      const user = await this.userModel.findOne({userId:_payload.id}).exec();
    console.log(user.userId);
       // Update user properties based on the payload
       if (_payload.first_name) {
        user.firstName = _payload.first_name;
    }
    if (_payload.first_name) {
        user.lastName = _payload.first_name;
    }
    if (_payload.email) {
      user.email = _payload.email;
  }
    // You can similarly update other properties like image_url, email, etc.

    // Save the updated user
    await user.save();
  const response: UpdateUserResponse = {
      first_name: user.firstName,
      last_name: user.lastName,
      image_url: '',//user.image_url,
      email: user.email,
   
    };

    return response;

    } catch (error) {
      throw new NotFoundException('User not found');
    }
    
    
    // if (!user || !(await bcrypt.compare(payload.password, user.password))) {
    //   throw new BadRequestException('invalid email or password');
    // }
    //  const token = await this.generateToken(user);
    //  user.access_token = token.access_token;
    //  user.refresh_token = token.refresh_token;
    //  user = await this.userModel.save(user);
    // user.image_url = getProfileImageUrl(user.image_url); 
  
  }

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }
  async update( id: string,updateUserDto: UpdateRefreshDto): Promise<UserDocument> {
 
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async addCourses(userId: string, ChooseCourse: UserChooseCourse): Promise<any> {
    // Find the user by userId
    const user = await this.userModel.findOne({ userId });
  
    // If user not found, throw an error or handle as required
    if (!user) {
      // handle user not found
      throw new Error('User not found');
    }
  
    // Ensure uniqueness of courseIds
    const uniqueCourseIds = ChooseCourse.courseIds.filter(courseId => !user.courseID.includes(courseId));
  
    if (uniqueCourseIds.length > 0) {
      // Add unique courseIds to user's courseID array
      user.courseID.push(...uniqueCourseIds);
  
      // Save the updated user document
      await user.save();
      return { message: "Courses added successfully" };
    } else {
      return { message: "User has already taken this course" };
    }
}

async deleteCourses(userId: string, RemoveCourse: UserRemoveCourse): Promise<any> {
  // Find the user by userId
  const user = await this.userModel.findOne({ userId });

  // If user not found, throw an error or handle as required
  if (!user) {
    // handle user not found
    throw new Error('User not found');
  }

  // Remove the courseIdsToDelete from user's courseID array
  // user.courseID = RemoveCourse.courseIds.filter(courseId => !user.courseID.includes(courseId));

  // // Save the updated user document
  // await user.save();

  // Delete the specified courses from the database
  await this.userModel.updateOne(
    { _id: user._id },
    { $pull: { courseID: { $in: RemoveCourse.courseIds } } }
  );
  
  return { message: "Courses deleted successfully" };
}

}
