import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatsService {

chats: Chat[]= [{name:"Sam",text:"GG"}]

clientToUser={};

identify(name:string,clientId:string){
this.clientToUser[clientId] = name;
return  Object.values(this.clientToUser);
}

getclientName(clientId:string){
  return this.clientToUser[clientId];
}

  create(createChatDto: CreateChatDto) {
    const chat = {...createChatDto}
     this.chats.push(createChatDto);
     return chat
  }

  findAll() {
    return this.chats;
  }
}
