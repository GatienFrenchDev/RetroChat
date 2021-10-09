const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const config = require('./config/config.json')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = config.port

app.use('/',express.static(__dirname +'/../client/'));


io.on('connection', socket =>{

    socket.emit('message', 'Bienvenue sur le chat !')

    socket.broadcast.emit('message', 'Un utilisateur a rejoint')

    socket.on('disconnect', () =>{
        io.emit('message', 'Un utilisateur a deconnecté')
    })

    socket.on('NewMessage', (msg) =>{
        io.emit('message', msg)
    })
})

server.listen(port, () => {
    console.log(`Lancement du serveur sur le port ${port}`)
})

app.get("/", (req, res) =>{
    res.sendFile(path.resolve(__dirname + "/../client/index.html"))
})