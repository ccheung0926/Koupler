angular.module('koupler.main', [])

.controller('MainCtrl', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {

  vm = this;

  vm.tabs = {
    'Profile': '/profile',
    'Activities': '/activities',
    'Matches': '/match'
  };

  vm.goToLink = function(link) {
    $state.go(link);
  };

}]);

