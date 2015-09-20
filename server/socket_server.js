module.exports = function(server){

  var path = require('path'); 
  var io = require('socket.io')(server);
  var users = {};
  var sender;

  io.on('connection', function(socket){
    console.log('socket connected');
    //sender's username
    socket.on('getSenderUsername', function(data){
      console.log('getSenderUsername', data);
      users[data] = socket;
      sender = data;
    });
    //receiver's username
    socket.on('sendReceiverToServer', function(data){
      console.log('sendReceiverToServer', data);
      users[data.receiverUsername] = socket;
      console.log('receiver', data);
      console.log('sender', sender);
      socket.emit('senderNameToClient', sender);
      socket.emit('getNamefromServer', data);
    });

    socket.on('sendMessageToServer', function(data){
      console.log('sendMessageToServer', data); 
      //chat hist bewteen users
      // When a message is received, emit the data to the receiver.
      users[data.to].emit('receivedMessage', data);
    });
  });

};