module.exports = function(server){

  var path = require('path'); 
  var io = require('socket.io')(server);
  var users = {};

  io.on('connection', function(socket){
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
      // io.sockets.socket(users[data.receiverUsername]).emit('receivedMessage', data);
    });
    // when the client emits 'typing', we broadcast it to others
  // socket.on('typing', function () {
  //   socket.broadcast.emit('typing', {
  //     username: socket.username
  //   });
  // });
  // when the client emits 'stop typing', we broadcast it to others
  // socket.on('stop typing', function () {
  //   socket.broadcast.emit('stop typing', {
  //     username: socket.username
  //   });
  // });
  });

};