import * as socketIO from 'socket.io'
import * as http from 'http'

interface DotSync {
  x: number
  y: number
}

export class SyncSockets {
  private _io: socketIO.Server | null = null
  private _sessions: socketIO.Socket[] = []
  private _prevSync: DotSync | null = null

  constructor(server: http.Server, origin: string) {
    this._io = new socketIO.Server(server, {
      cors: { origin: true },
    })
    this._io.on('connection', (socket) => {
      this._onConnection(socket)
      socket.on('dotMove', (sync) => {
        this._onDotMove(socket, sync)
      })
      socket.on('disconnect', () => {
        this._onDisconnection(socket)
      })
    })
  }

  _onConnection(socket: socketIO.Socket): void {
    console.log('New client connected', socket.id)
    this._sessions.push(socket)
    if (this._prevSync) {
      socket.emit('syncDot', this._prevSync)
    }
  }

  _onDisconnection(socket: socketIO.Socket): void {
    console.log(`${socket.id} disconnected!`)
    const idx = this._sessions.indexOf(socket)
    this._sessions.splice(idx, 1)
  }

  _onDotMove(socket: socketIO.Socket, sync: DotSync): void {
    this._prevSync = sync
    for (const session of this._sessions) {
      if (session === socket) continue
      socket.emit('syncDot', sync)
    }
  }
}
