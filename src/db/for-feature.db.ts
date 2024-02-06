
import { Client, ClientSchema } from 'src/module/clients/entities/client.entity';
import { Course, CourseSchema } from 'src/module/courses/entities/course.entity';
import { User, UserSchema } from 'src/module/user/entities/user.entity';


export default [
  { name: User.name, schema: UserSchema },
  { name: Client.name, schema: ClientSchema },
  { name:Course.name,schema: CourseSchema }
];