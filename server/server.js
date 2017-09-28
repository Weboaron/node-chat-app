const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js')

var app = express();
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection',(socket)=>{
  console.log('New user connected');

  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'))

  socket.on('createMessage',(mail)=>{
      console.log("Message:",mail)
  })

  socket.on('welcomeMessage',(user)=>{
    socket.emit('welcomeMessage',{generateMessage('Admin',`Hello there ${user.username}`)})

    socket.broadcast.emit('welcomeMessage',{generateMessage('Admin',`${user.username} just logged in`)})
  })

  socket.on('disconnect',(socket)=>{
    console.log("Disconnected from client")
  })
})

server.listen(port,()=>{
  console.log(`The server start running on port ${port}`);
})
