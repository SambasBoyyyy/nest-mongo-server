import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server, Socket } from "socket.io"


@WebSocketGateway({
  cors: {
    origin: '*',
    // credentials: true,
  },
})
export class ChatsGateway {

  @WebSocketServer()
  server:Server
  constructor(private readonly chatsService: ChatsService) {}

  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto,@ConnectedSocket() client:Socket) {
    const chat= this.chatsService.create(createChatDto,client.id);
    this.server.emit('createChat', chat);
    return chat;
  }

  @SubscribeMessage('findAllChats')
  findAll() {
    return this.chatsService.findAll();
  }

  @SubscribeMessage('joinChat')
  joinChat(@MessageBody('name') name: string,@ConnectedSocket() client:Socket) {
    return this.chatsService.identify(name,client.id);
  }

  @SubscribeMessage('typing')
  async typing(@MessageBody('isTyping') isTyping:boolean,@ConnectedSocket() client:Socket) {
    const name = this.chatsService.getclientName(client.id);
    client.broadcast.emit('typing', {name,isTyping});
  }
}
