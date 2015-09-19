angular.module('koupler.activities', [])

.controller('ActivityPickerCtrl', function($scope, $http, Activities, AuthTokenFactory) {

  vm = this;

  vm.activities = Activities.getActivities();

  vm.activityChosen;
  vm.postActivity = function (activity, zip, distance) {
    var token = AuthTokenFactory.getToken();

    $http.post('/activities/match', 
        {
          activity: vm.activityChosen,
          userZipCode: vm.userZipCode, 
          searchDistance: vm.searchDistance,
          token: token
        })
      .then(function(response) {
        vm.matches = response.data;
        console.log(vm.matches);
        vm.matched = true;
        console.log(vm.activityChosen);
        $http.post('/activities/suggestions', {
          activityChosen: vm.activityChosen,
          userZipCode: vm.userZipCode
        })
      })
  };
});
