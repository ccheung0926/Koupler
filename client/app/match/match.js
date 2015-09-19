angular.module('koupler.match',[])

//ctrl name changed from useCtrl to couplesCtrl
.controller('MatchCtrl', function($scope, $http, AuthTokenFactory) {
  
  var token = AuthTokenFactory.getToken();

});