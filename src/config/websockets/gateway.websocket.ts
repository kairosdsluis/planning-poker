import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { Socket, Server } from 'socket.io'
import { SOCKET, SERVER, GATEWAY } from './store.websocket'

@WebSocketGateway({
  cors: {
    origin: '*',  // Allow cross-origin requests (configure properly for your environment),
  },
  // pingTimeout: 10000,    // Increase pingTimeout (in ms)
  // pingInterval: 2500,    // Increase pingInterval (in ms)
  // methods: ['GET', 'POST']
})
export class GatewayWebSocket implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server
  private readonly logger: Logger = new Logger(GATEWAY)

  @SubscribeMessage(SERVER)
  async handleMessage(client: Socket, payload: any) {
    await SOCKET.sendData(client, payload, this.server)
  }

  async handleConnection(client: Socket) {
    await SOCKET.addUser(client, this.server)
  }

  async handleDisconnect(client: Socket) {
    await SOCKET.removeUser(client, this.server)
  }

  async afterInit(_server: Server) {
    this.logger.log('Planning-Poker-API has been initialized!')
  }
}