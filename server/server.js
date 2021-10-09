const express = require('express')
const { cp } = require('fs')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const config = require('./config/config.json')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = config.port

app.use('/',express.static(__dirname +'/../client/'));

server.listen(port, () => {
    console.log(`Lancement du serveur sur le port ${port}`)
})

app.get("/", (req, res) =>{
    res.sendFile(path.resolve(__dirname + "/../client/index.html"))
})

io.on('connection', socket =>{
    console.log('NEW Ws connection...')
})