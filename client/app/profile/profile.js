angular.module('koupler.profile', [
  'ui.bootstrap'
  ])

.controller('ProfileCtrl', ['$scope', '$state', '$modal', '$http', 'Activities', 'AuthTokenFactory', 'Upload', '$window', 'socket', function($scope, $state, $modal, $http, Activities, AuthTokenFactory, Upload, $window, socket) {

  var vm = this;
  //placeholder for POST request until routeParam is set up
  vm.username = $state.params.username;

  $scope.sender = $scope.$parent.loginUser;

  $window.localStorage.setItem('Koup_user', vm.username);

  vm.goToActivities = function() {
    $state.go('activities');
  };
  vm.profileData = {};

  // when true, hides the profile pic and replaced with uploaded pic
  vm.hideProfilePic = false;

  vm.getProfileInfo = function() {
    var token = AuthTokenFactory.getToken();
    //GET request should respond with user's profile picture, interests, about, memories, etc.
    $http.get('/profile/' + vm.username)
      .then(function(response) {
        if (response.data[0].isAuthorizedToEdit) {
          vm.isAuthorizedToEdit = true;
        }
        console.log("getProfileInfo:", response.data);
        vm.profileData = response.data[0];
      });

  };
  vm.getProfileInfo();


  vm.showEditModal = function() {
    var editModal = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'app/profile/modal-editProfile.html',
      controller: 'ProfileCtrl',
    });
  };


  console.log('vm.username', vm.username);
  vm.uploadFiles = function(file) {
    vm.f = file;

    if (file && !file.$error) {
      vm.hideProfilePic = true;

      file.upload = Upload.upload({
        url: '/profile/' + vm.username + '/pic',
        file: file,
        method: 'POST'
      });

      file.upload.then(function(response) {
        //should send back src url for img
      }, function(response) {
        vm.errorMsg = response.status;
      });
    }
  };

  socket.on('senderNameToClient', function(sender){
    vm.sender = sender;
  });

  vm.chatInit = function() {
    $scope.openConversation = true;
    //get chat history
    $http.get('/chat', {params: {to: vm.username, from: $scope.sender}})
      .then(function(response) {
        vm.chatData = response.data;
        socket.emit('sendReceiverToServer', {
          receiverUsername: vm.profileData.username,
          couples1: vm.profileData.person_1_first_name + " " + vm.profileData.person_1_last_name,
          couples2: vm.profileData.person_2_first_name + " " + vm.profileData.person_2_last_name,
          chatHist: vm.chatData
        });
      });
  }
}])
