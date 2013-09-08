wordApp.controller('SplashCtrl', function SplashCtrl($scope, $location, Game, angularFire) {

  //var url = 'https://word-gaming.firebaseio.com/';
//  var fbUrl = 'https://word-gaming.firebaseio.com/' ;
  var dbRef = new Firebase( 'https://word-gaming.firebaseio.com/' );
  //var dbRef = new Firebase('https://wordbang.firebaseio.com/');

  //var wordsRef = dbRef.child('words');
  var gamesRef = dbRef.child('games');
  //var opengamesRef = dbRef.child('opengames');

  //angularFire(wordsRef.limit(10), $scope, "words");
  angularFire(gamesRef, $scope, "games", []);




  //angularFire(opengamesRef, $scope, "opengames", []);

//  angularFire(opengamesRef, $scope, "opengames", {}).then(function() {
//    $scope.showOpengames = true;
//  });

  //var url = 'https://todomvc-angular.firebaseio.com/';
  //$scope.newWord = '';
  //$scope.username = 'paola';
  $scope.user = {};


  console.log("games = " + $scope.games);


  //$scope.existingWords = ['test'];


  $scope.login = function() {
    localStorage("player") = $scope.user.name;
  }


  $scope.createGame = function() {

    $scope.games[gamesRef.push().name()] = {
      //player: $scope.username
      player1: $scope.user.name,
      started: "pending"
    };
    $location.path( "/game/" + game.id );
    $scope.deleteOpengame(opengame);

  };

  $scope.deleteOpengame = function (opengame) {
    console.log("opengame = " + opengame);
    //$scope.opengames.splice($scope.opengames.indexOf(opengame), 1);
    var toRemove = new Firebase(fbUrl + 'opengames/' + opengame.name());
    toRemove.remove();
  };


//
//  $scope.removeItem = function() {
//    $scope.items.splice($scope.toRemove, 1);
//    $scope.toRemove = null;
//  };

  $scope.addOpengame = function() {
    console.log("username = " + $scope.user.name);
    var timestamp = new Date().getTime();

    $scope.opengames[opengamesRef.push().name()] = {
        id: timestamp, player: $scope.user.name
    };

    $('#can-start').hide();
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