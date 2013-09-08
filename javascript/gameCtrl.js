wordApp.controller('GameCtrl', function GameCtrl($scope, $location, Game, angularFire) {

  //var url = 'https://word-gaming.firebaseio.com/';
  var dbRef = new Firebase('https://word-gaming.firebaseio.com/');
  //var dbRef = new Firebase('https://wordbang.firebaseio.com/');

  //var wordsRef = dbRef.child('words');
  var gamesRef = dbRef.child('games');
  var opengamesRef = dbRef.child('opengames');

  //angularFire(wordsRef.limit(10), $scope, "words");
  angularFire(gamesRef.limit(10), $scope, "games");
  angularFire(opengamesRef.limit(20), $scope, "opengames");

  //var url = 'https://todomvc-angular.firebaseio.com/';
  //$scope.newWord = '';
  //$scope.username = 'paola';
  $scope.user = {};



  //$scope.existingWords = ['test'];

//  $scope.addGame = function() {
//
//    $scope.games[gamesRef.push().name()] = {
//      player: $scope.username
//    };
//    $location.path( "/game" );
//  };

  $scope.addOpengame = function() {
    console.log("username = " + $scope.user.name);

    $scope.opengames[opengamesRef.push().name()] = {
        player: $scope.user.name
    };

    $scope.user.can-start = "no";
  };


//  $scope.addWord = function() {
//    //console.log($scope.words);
//    //console.log("newWord is " + $scope.newWord);
//
//    var points = $scope.newWord.length;
//    $scope.words[wordsRef.push().name()] = {
//      username: $scope.user.name, content: $scope.newWord, points: points
//    };
//    $scope.newWord = "";
//  };

 
});