import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { room: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.room);
    return { event: 'joinedRoom', room: data.room };
  }

  @SubscribeMessage('sendNotification')
  handleNotification(
    @MessageBody() payload: { title: string; message: string; channel: string },
  ) {
    this.server.to(payload.channel).emit('notification', payload);
    return { status: 'sent' };
  }

  emitBedStatusChange(bedId: string, status: string) {
    this.server.emit('bedStatusChanged', { bedId, status, timestamp: new Date() });
  }
}
