angular.module('koupler.profile', [
  'ui.bootstrap'
  ])

.controller('ProfileCtrl', function($scope, $state, $http, Activities, AuthTokenFactory, Upload, socket) {

  var vm = this;
  //placeholder for POST request until routeParam is set up
  vm.username = $state.params.username;

  vm.goToActivities = function() {
    $state.go('activities');
  };
  console.log('my username', $scope.$parent.username)
  vm.profileData = {};

  vm.getProfileInfo = function() {
    var token = AuthTokenFactory.getToken();
    console.log(token);
    //GET request should respond with user's profile picture, interests, about, memories, etc.
    $http.get('/profile/' + vm.username)
      .then(function(response) {
        if (response.data[0].isAuthorizedToEdit) {
          vm.isAuthorizedToEdit = true;
        };
        console.log("getProfileInfo:", response.data);
        vm.profileData = response.data[0];
      });
  };



  vm.showEditModal = function() {
    var editModal = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'app/profile/modal-editProfile.html',
      controller: 'ProfileCtrl',
    });
  }



  vm.uploadFiles = function(file) {
    vm.f = file;
    if (file && !file.$error) {
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


  vm.chatInit = function() {
    $scope.openConversation = true; 
    //ctrl.profileData.username
    // profileData.person_1_first_name
    //                    2 last name
    console.log(vm.profileData);
    //get chat history

    $http.get('/chat')

    socket.emit('sendReceiverToServer', {
      receiverUsername: vm.profileData.username,
      couples1: vm.profileData.person_1_first_name + " " + vm.profileData.person_1_last_name,
      couples2: vm.profileData.person_2_first_name + " " + vm.profileData.person_2_last_name
    });
  }
})
