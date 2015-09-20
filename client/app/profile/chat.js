angular.module('koupler.chat', [])

.controller('ChatCtrl', ['$scope','socket',function($scope, socket){
  var vm = this;
  vm.openChatBox = false;
  vm.sender = $scope.$parent.sender;


  vm.openClose = function() {
    console.log('chat sender', $scope.$parent.sender);
    if(!vm.openChatBox) {
      vm.openChatBox = true;
    }
    else {
      vm.openChatBox = false;
    }
    console.log('$scope.parent', $scope.$parent.sender);
  };

  vm.sendMessage = function(){
    socket.emit('sendMessageToServer', {
    to: vm.receiverUsername,
    //from: /*sender*/,
    //message: /*message*/
    });
  //empty the message input here
  }

  //get receiver's username from socket
  socket.on('getNamefromServer', function(name) {
  //{receiverUsername: "beckhams",
  // couples1: "Victoria Beckham", couples2: "David Beckham"}
    vm.name = name.couples1 + " & " + name.couples2;
    vm.receiverUsername = name.receiverUsername;
  });

  //user received message
  socket.on('receivedMessage', function(data) {

  });

}]);
