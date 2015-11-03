module.exports = function(server){

  var path = require('path'); 
  var io = require('socket.io')(server);
  var users = {};

  io.on('connection', function(socket){
    console.log('connected');
    socket.on('createSocketUser', function(data){
      users[data] = socket;
    });
    //receiver's username
    socket.on('sendReceiverToServer', function(data){

      socket.emit('getNameHistfromServer', data);
    });

    socket.on('sendMessageToServer', function(data){
      // When a message is received, emit the data to the receiver.
      console.log('sendMessageToServer', data);      
      users[data.receiver].emit('receivedMessage', data);
    });
  });

};