import { Server } from 'http'
import { Express } from 'express'
import { ExpressPeerServer } from 'peer'
import { nanoid } from 'nanoid'

export default class PeerServer {
  protected server: Server

  protected app: Express

  protected config = {
    path: '/',
    generateClientId: () => nanoid(11)
  }

  constructor (server: Server, app: Express) {
    this.server = server
    this.app = app
  }

  attach () {
    const peerServer = ExpressPeerServer(this.server, this.config)
    this.app.use('/peer', peerServer)
  }
}
