import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatsService {

chats: Chat[]= [{name:"Sam",text:"GG"}]

  create(createChatDto: CreateChatDto) {
    const chat = {...createChatDto}
     this.chats.push(createChatDto);
     return chat
  }

  findAll() {
    return this.chats;
  }
}
