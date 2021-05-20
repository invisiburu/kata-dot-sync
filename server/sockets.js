/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @typedef {object} DotSync
 * @property {number} x
 * @property {number} y
 */

const socketIO = require('socket.io')

const sockets = {
  /** @type {socketIO.Server} */
  _io: null,
  /** @type {socketIO.Socket[]} */
  _sessions: [],
  /** @type {DotSync} */
  _prevSync: null,

  /**
   * @param {import('http').Server} server
   * @param {string} origin
   */
  init(server, origin) {
    this._io = new socketIO.Server(server, {
      cors: {
        origin: origin,
        methods: 'GET',
      },
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
  },

  /** @param {socketIO.Socket} socket */
  _onConnection(socket) {
    console.log('New client connected', socket.id)
    this._sessions.push(socket)
    if (this._prevSync) {
      this._syncDot(socket, this._prevSync)
    }
  },

  /** @param {socketIO.Socket} socket */
  _onDisconnection(socket) {
    console.log(`${socket.id} disconnected!`)
    const idx = this._sessions.indexOf(socket)
    this._sessions.splice(idx, 1)
  },

  /**
   * @param {socketIO.Socket} socket
   * @param {DotSync} sync
   */
  _onDotMove(socket, sync) {
    this._prevSync = sync
    for (const session of this._sessions) {
      if (session === socket) continue
      this._syncDot(session, this._prevSync)
    }
  },

  /**
   * @param {socketIO.Socket} socket
   * @param {DotSync} sync
   */
  _syncDot(socket, sync) {
    socket.emit('syncDot', sync)
  },
}

module.exports = sockets
