/* eslint-disable @typescript-eslint/no-var-requires */

const http = require('http')
const path = require('path')
const express = require('express')
const sockets = require('./sockets')

const PORT = 3000
const DOC_ROOT = './../dist/'

const app = express()
const server = http.createServer(app)

const documentRoot = path.join(__dirname, DOC_ROOT)
const staticContent = express.static(documentRoot)
app.use(staticContent)

server.listen(PORT, () => {
  const addr = server.address()
  console.log(`Server is running on port http://${addr.address}:${PORT}`)
})

sockets.init(server)
