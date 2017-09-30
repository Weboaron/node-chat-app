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
  var messageTextbox = jQuery('[name=message]')

  socket.emit('createMessage',{
    from:'User',
    text:messageTextbox.val()
  }, function(){
      messageTextbox.val('')
  })
})

socket.on('newMessage',function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a')
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  })
  // var li = jQuery('<li></li>');
  // li.text(`${email.from} ${formattedTime}: ${email.text}`)
  jQuery('#messages').append(html)
})

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser.');
  }
  locationButton.attr('disabled','disabled').text('Sending location...')
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location')
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function(){
    alert('Unable to fetch location.');
    locationButton.removeAttr('disabled').text('Send location')
  });
});

socket.on('newLocationMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
      url: message.url,
      from: message.from,
      createdAt: formattedTime
    })
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');
  //
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  jQuery('#messages').append(html);
});
