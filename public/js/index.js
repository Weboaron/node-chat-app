var socket = io();

socket.on('connect',function(){
  console.log('Connected to server');

})

socket.emit('welcomeMessage',{
  username:"Ofir Boaron"
})

socket.on('welcomeMessage',function(message){
  console.log(message)
})

socket.on('New welcome',function(message){
  console.log(message)
})

socket.on('newMessage',function(email){
  console.log(`New Email From:${email.from} message:"${email.text}" Create:${email.createdAt}`)
})

socket.emit('createMessage',{
  from:"Dede",
  text:"Bye"
})

socket.on('disconnect',function(socket){
  console.log("Disconnected from server")
})
