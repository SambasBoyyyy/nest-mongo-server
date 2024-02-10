import { Double } from "mongodb";

export type CourseDto={
    
    title: string;
    instructor: string;
    rating: Double;
    course_img_url?: string;
    description?: string;
    duration: string;
}