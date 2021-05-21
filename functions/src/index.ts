import * as functions from 'firebase-functions'
import * as http from 'http'
import * as path from 'path'
import * as express from 'express'
import * as cors from 'cors'
import { SyncSockets } from './sockets'

// const PORT = Number(process.env.PORT)
// const HOST = String(process.env.HOST)
const DOC_ROOT = '../../dist/'

const app = express()
// app.use(cors({ origin: true }))

const documentRoot = path.join(__dirname, DOC_ROOT)
const staticContent = express.static(documentRoot)
app.use(staticContent)

const server = http.createServer(app)
server.listen(() => {
  // console.log(`Server is running on port http://${HOST}:${PORT}`)
})
// new SyncSockets(server, `http://${HOST}:${PORT}`)
new SyncSockets(server, 'http://127.0.0.1:5000')

const corsHandler = cors({ origin: true })
export const fireApp = functions.https.onRequest((req, res) => {
  return corsHandler(req, res, () => app(req, res))
})
