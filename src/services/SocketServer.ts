import { Server } from 'http'
import Faye from 'faye'

export default class SocketServer {
  protected server: Server

  constructor (server: Server) {
    this.server = server
  }

  attach () {
    const socket = new Faye.NodeAdapter({ mount: '/socket' })
    socket.attach(this.server)
  }
}
