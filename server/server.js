/* eslint-disable @typescript-eslint/no-var-requires */

const http = require('http')
const path = require('path')
const express = require('express')
const sockets = require('./sockets')

const PORT = process.env.PORT
const CORS = process.env.CORS || 'http://127.0.0.1:3000'
const DOC_ROOT = './../dist/'

const app = express()
const server = http.createServer(app)

const documentRoot = path.join(__dirname, DOC_ROOT)
const staticContent = express.static(documentRoot)
app.use(staticContent)

server.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`)
})

sockets.init(server, CORS)
