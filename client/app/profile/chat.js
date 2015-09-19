angular.module('koupler.profile')

.controller('ChatCtrl', ['$scope','socket',function($scope, socket){
  var vm = this;
  vm.openChatBox = false;

  vm.openClose = function() {
    if(!vm.openChatBox) {
      vm.openChatBox = true;
    }
    else {
      vm.openChatBox = false;
    }
  }
  vm.closeConversation = function(){
    $scope.$parent.openConversation = false;
    console.log($scope.$parent.openConversation);
  }

  socket.emit('sendMessageToServer', {
    //to: /*receiver*/,
    //from: /*sender*/,
    //message: /*message*/
  });
  //empty the message input here

  //get receiver's username from socket
  socket.on('getNamefromServer', function(name) {
    console.log('name',name)
  });

  //user received message
  socket.on('receivedMessage', function(data) {

  });


}]);