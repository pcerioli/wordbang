var wordApp = angular.module('wordApp', ['firebase']);

/*  ROUTING */
wordApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  $routeProvider.
  	when('/', { templateUrl: 'pages/home.html' }).
  	when('/login', { templateUrl: 'pages/login.html' }).
  	when('/game', { templateUrl: 'pages/game.html' }).
  	when('/privacy', { templateUrl: 'pages/privacy.html' }).
  	when('/terms', { templateUrl: 'pages/terms.html' }).
  	otherwise({ redirectTo: '/' });
  
  $locationProvider.html5Mode(true);

}]);






