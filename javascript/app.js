/*global angular */
/*jshint unused:false */
//'use strict';

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
var wordApp = angular.module('wordApp', ['firebase']);

/*  ROUTING */
wordApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  $routeProvider.
  	when('/', { templateUrl: 'pages/home.html', controller: 'GameCtrl' }).
  	when('/login', { templateUrl: 'pages/login.html', controller: 'GameCtrl'  }).
  	when('/game', { templateUrl: 'pages/game.html', controller: 'GameCtrl'  }).
  	when('/privacy', { templateUrl: 'pages/privacy.html' }).
  	when('/terms', { templateUrl: 'pages/terms.html' }).
  	otherwise({ redirectTo: '/' });
  
  $locationProvider.html5Mode(true);

}]);

/*  AUTHENTICATION */
// wordApp.run(['$rootScope', 'authManager', function($rootScope, authManager) {
//  $rootScope.login = authManager.login;
//  $rootScope.logout = authManager.logout;
// }]);






// wordApp.filter('wordFilter', function ($location) {
// 	return function (input) {
// 		var filtered = {};
// 		angular.forEach(input, function (todo, id) {
// 			var path = $location.path();
// 			if (path === '/active') {
// 				if (!todo.completed) {
// 					filtered[id] = todo;
// 				}
// 			} else if (path === '/completed') {
// 				if (todo.completed) {
// 					filtered[id] = todo;
// 				}
// 			} else {
// 				filtered[id] = todo;
// 			}
// 		});
// 		return filtered;
// 	};
// });