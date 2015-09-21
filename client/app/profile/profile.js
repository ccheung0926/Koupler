angular.module('koupler.profile', [
  'ui.bootstrap'
  ])

.controller('ProfileCtrl', ['$scope', '$state', '$modal', '$http', 'Activities', 'AuthTokenFactory', 'Upload', '$window', function($scope, $state, $modal, $http, Activities, AuthTokenFactory, Upload, $window) {

  var vm = this;
  //placeholder for POST request until routeParam is set up
  vm.username = $state.params.username;
  $window.localStorage.setItem('Koup_user', vm.username);

  vm.goToActivities = function() {
    $state.go('activities');
  };

  vm.profileData = {};

  vm.getProfileInfo = function() {
    var token = AuthTokenFactory.getToken();
    console.log(token);
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

  vm.chatInit = function(receiver) {
    if(!$scope.openConversation) {
      $scope.openConversation = true;
    }
    console.log($scope.openConversation);

  };

}]);

