const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

var app = express();
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection',(socket)=>{
  console.log('New user connected');

  socket.emit('newMessage',{
    from: "Ofir",
    text: "Hello There",
    createdAt: 28
  })

  socket.on('createMessage',(mail)=>{
      console.log("Message:",mail)
  })

  socket.on('welcomeMessage',(user)=>{
    socket.emit('welcomeMessage',{
      message:`Hello there ${user.username}`
    })

    socket.broadcast.emit('welcomeMessage',{
      message:`${user.username} just logged in`
    })
  })

  socket.on('disconnect',(socket)=>{
    console.log("Disconnected from client")
  })
})

server.listen(port,()=>{
  console.log(`The server start running on port ${port}`);
})
