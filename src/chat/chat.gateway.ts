import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { discussions } from 'generated/prisma';
import { Server, Socket } from 'socket.io';
import { DiscussionsService } from 'src/discussions/discussions.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private discussionService: DiscussionsService
  ) { }

  handleConnection(client: any) {
    console.log('Client connected', client.id);

    client.broadcast.emit('user-joined', {
      message: `User joined the chat: ${client.id}`,
      clientId: client.id,
    });
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('Client disconnected', client.id);

    this.server.emit('user-left', {
      message: `User left the chat: ${client.id}`,
      clientId: client.id,
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
}
