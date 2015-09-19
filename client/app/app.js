angular.module('koupler', [
  'koupler.main',
  'koupler.profile',
  'koupler.chat',
  'koupler.factories',
  'koupler.activities',
  'koupler.auth',
  'koupler.match',
  'koupler.suggestions',
  'ui.router',
  'ui.bootstrap',
  'ngFileUpload'
])
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      templateUrl: 'app/auth/homepage.html',
      url:'/',
      controller: 'AuthCtrl'
    })
    .state('profile', {
      url:'/profile/:username',
      controller: 'ProfileCtrl',
      views: {
        '': {
          templateUrl:'app/profile/profile.html'
        },
        'profileInfo@profile': {
          templateUrl:'app/profile/partial-profileInfo.html'
        },
        'memories@profile': {
          templateUrl:'app/profile/partial-memories.html'
        },
        'chat@profile': {
          templateUrl:'app/profile/partial-chat.html'
        }
      },
      authenticate: true,
    })
    .state('activities', {
      url:'/activities',
      views: {
        '': {
          templateUrl: 'app/activityPickerCtrl/activityPicker.html',
        },
        'activities@activities': {
          templateUrl: 'app/activityPickerCtrl/partial-activities.html'
        },
        'match@activities': {
          templateUrl: 'app/match/match.html'
        },
        'suggestions@activities': {
          templateUrl: 'app/match/partial-suggestions.html'
        }
      },
      controller: 'ActivityPickerCtrl',
      authenticate: true,
    });

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    $httpProvider.interceptors.push('AttachTokens');
}])
.factory('AttachTokens', ['$window', function($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function(object) {
      var jwt = $window.localStorage.getItem('JWT');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
}])
.run(['$rootScope', '$state', '$location', '$window', 'AuthTokenFactory', function($rootScope, $state, $location, $window, AuthTokenFactory) {
  //since routing is based on state (ui.router), the $rootScope needs to check for
  //a state change rather than a route change in order to check authentication
  $rootScope.$on('$stateChangeStart', function(evt, next, current) {

    // if (!AuthTokenFactory.isAuth()) {
    //   $location.path('/');
    // }
  });
}]);

