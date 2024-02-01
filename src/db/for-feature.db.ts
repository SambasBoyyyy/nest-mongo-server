
import { Client, ClientSchema } from 'src/module/clients/entities/client.entity';
import { User, UserSchema } from 'src/module/user/entities/user.entity';


export default [
  { name: User.name, schema: UserSchema },
  { name: Client.name, schema: ClientSchema }
];