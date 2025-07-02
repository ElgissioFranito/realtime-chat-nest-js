import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { discussions } from 'generated/prisma';
import { randomInt } from 'node:crypto';
import { Server, Socket } from 'socket.io';
import { DiscussionsService } from 'src/discussions/discussions.service';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private discussionService: DiscussionsService,
    private userService: UsersService
  ) { }

  async handleConnection(client: Socket) {
    console.log('Client connected', client.id);

    const user = await this.userService.createUser({
      id: this.stringToUniqueNumber(client.id),
      name: `User-${client.id}`,
    });

    client.broadcast.emit('user-joined', {
      message: `User joined the chat: ${client.id}`,
      clientId: client.id,
      user: user
    });

    // Envoyer au client connecté
    client.emit('connection-success', {
      message: 'You are connected!',
      clientId: client.id,
      userId: this.stringToUniqueNumber(client.id),
      user,
    });

  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('Client disconnected', client.id);

    const userConnected = await this.userService.getOne(this.stringToUniqueNumber(client.id));

    if (userConnected) {
      await this.userService.removeUser(userConnected.id);
    }
    
    this.server.emit('user-left', {
      message: `User left the chat: ${client.id}`,
      clientId: client.id,
      userId : this.stringToUniqueNumber(client.id)
    });
    
  }


  @SubscribeMessage('test')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('message', payload);
  }


  @SubscribeMessage("createDiscussion")
  async createDiscussion(clientSocket: Socket, discussion: discussions) {

    await this.discussionService.createDiscussion(discussion);

    const discussions = await this.discussionService.listDiscussion();

    this.server.emit('discussionCreated', discussions);

    console.log('connection.socketId : ' + clientSocket.id);

  }

  // Pour obtenir un nombre unique basé sur le "client.id"
  stringToUniqueNumber(str: string) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 33) ^ str.charCodeAt(i);
    }
    // Utiliser Math.abs pour éviter les nombres négatifs et modulo pour rester sous 999999
    return Math.abs(hash) % 999999;
  }
}
