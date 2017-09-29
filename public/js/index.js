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


socket.on('newMessage',function(email){
  console.log(`New Email From:${email.from} message:"${email.text}" Create:${email.createdAt}`)
})


socket.on('disconnect',function(socket){
  console.log("Disconnected from server")
})

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()
  })

})

socket.on('newMessage',function(email){
  var li = jQuery('<li></li>');
  li.text(`${email.from}: ${email.text}`)
  jQuery('#messages').append(li)
})
