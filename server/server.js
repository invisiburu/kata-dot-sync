/* eslint-disable @typescript-eslint/no-var-requires */

const http = require('http')
const path = require('path')
const express = require('express')
const sockets = require('./sockets')

const PORT = process.env.PORT
const HOST = process.env.HOST
const DOC_ROOT = './../dist/'

const app = express()
const server = http.createServer(app)

const documentRoot = path.join(__dirname, DOC_ROOT)
const staticContent = express.static(documentRoot)
app.use(staticContent)

server.listen(PORT, HOST, () => {
  console.log(`Server is running on port http://${HOST}:${PORT}`)
})

sockets.init(server, `http://${HOST}:${PORT}`)
