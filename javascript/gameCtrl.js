'use strict';


wordApp.controller('GameCtrl', function GameCtrl($scope, $location, Game, angularFire) {

  //var url = 'https://word-gaming.firebaseio.com/';
  var dbRef = new Firebase('https://word-gaming.firebaseio.com/');
  var wordsRef = dbRef.child('words');
  var gamesRef = dbRef.child('games');

  angularFire(wordsRef.limit(10), $scope, "words");
  angularFire(gamesRef.limit(10), $scope, "games");

  //var url = 'https://todomvc-angular.firebaseio.com/';
  $scope.newWord = '';
  $scope.user = '';
  $scope.existingWords = ['test'];

  $scope.addGame = function() {

    $scope.games[gamesRef.push().name()] = {
      player: $scope.username
    };
    $location.path( "/game" );
  };

  $scope.addWord = function() {
    //console.log($scope.words);
    //console.log("newWord is " + $scope.newWord);
    
    var points = $scope.newWord.length;
    $scope.words[wordsRef.push().name()] = {
      username: $scope.user.name, content: $scope.newWord, points: points
    };
    $scope.newWord = "";
  };

 
});