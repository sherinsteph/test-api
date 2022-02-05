import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import PeerServer from './services/PeerServer'
import SocketServer from './services/SocketServer'
import Shutdown from './services/Shutdown'
import Router from './services/Router'

const app = express()
const server = http.createServer(app)

const corsOptions = {
  origin: [
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:8100',
    'https://localhost:8100',
    'https://localhost:3000',
  ],
  credentials: true
}
const webAppHost = process.env.WEB_APP_HOST
const webAppUrl = `http://${webAppHost}`
if (webAppHost) corsOptions.origin.push(webAppUrl)

app.options('*', cors(corsOptions))
app.use(cors(corsOptions))
app.use(bodyParser.json())

new Router(app).initialize()
new PeerServer(server, app).attach()
new SocketServer(server).attach()
new Shutdown().initGracefull()
console.log('Port', process.env.PORT);
server.listen(process.env.PORT)
