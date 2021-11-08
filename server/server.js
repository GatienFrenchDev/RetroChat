const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const config = require('./config/config.json')

const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');


const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || config.port

app.use('/', express.static(__dirname + '/../client/'));

const botName = config.nom_bot;

io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    socket.emit('message', formatMessage(botName, 'Bienvenue sur RetroChat !'));

    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} a rejoint la salle`)
      );

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} a quitté la salle`)
      );

      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      })
    }
  })
})

server.listen(port, () => {
    console.log(`Lancement du serveur sur le port ${port}`)
})

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../client/index.html"))
})
