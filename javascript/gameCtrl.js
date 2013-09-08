'use strict';

function Game(data) {
  if (data) {
    this.data = data;
  } else {
    this.data = {
      winner: null,
      whoseTurn: null,
      player1: null,
      player2: null,
      disconnected: {},
      title: "Awaiting players ...",
      board: [['', '', ''], ['', '', ''], ['', '', '']]
    };
  }
}

Game.prototype = {
  addPlayer: function(player) {
    if (this.data.player1 != null && this.data.player2 != null) return;
    if (this.data.player1 == null) {
      this.data.player1 = player;
      this.data.whoseTurn = this.data.player1;
    } else {
      this.data.player2 = player;
    }
  },
  title: function() {
    if ( this.isTie() ) {
      this.data.title = "It's a tie!"
    } else if (this.data.winner) {
      this.data.title = this.data.winner + " won!";
    } else {
      if (this.data.player1 != null) {
        this.data.title = this.data.player1 + " vs. ";
        if (this.data.player2 != null) {
          this.data.title = this.data.title + this.data.player2;
        } else {
          this.data.title = this.data.title + "(awaiting 2nd player)";
        }
      }
    }
    return this.data.title;
  },
  board: function() {
    return this.data.board;
  },
  setConnected: function(player) {
    if (!this.data.disconnected) {
      this.data.disconnected = {};
    }
    this.data.disconnected[player] = false;
  },
  isAbandoned: function() {
    if (!this.data.disconnected) return false;
    var numPlayers = 0;
    if (this.data.player1) numPlayers++;
    if (this.data.player2) numPlayers++;
    var numDisconnected = 0;
    for (var k in this.data.disconnected) {
      if (this.data.disconnected[k]) numDisconnected++;
    }
    return (numDisconnected == numPlayers);
  },
  isTie: function() {
    for (var row in [0,1,2]) {
      for (var col in [0,1,2]) {
        if (this.data.board[row][col] === '') return false;
      }
    }
    return true;
  },
  isOver: function() {
    return (this.isTie() || this.data.winner != null);
  },
  checkForWinner: function() {

  }
}



app.controller('GameCtrl',['$scope', '$routeParams', '$location', '$cookies', 'angularFire', 'angularFireCollection',
      function($scope, $routeParams, $location, $cookies, angularFire, angularFireCollection) {
        $scope.username = $cookies.username;

        var gameUrl = 'https://word-gaming.firebaseio.com/games/' + $routeParams.gameId;
        var disconnectedRef = new Firebase(gameUrl + "/disconnected/" + $scope.username);
        disconnectedRef.onDisconnect().set(true);
        var promise = angularFire(gameUrl, $scope, 'gameData', {});
        promise.then(function(game) {
          watchGame($scope, $routeParams, angularFire, angularFireCollection);
        });
      }]);

function watchGame($scope, $routeParams, angularFire, angularFireCollection) {
  $scope.$watch('gameData', function() {
    $scope.game = new Game($scope.gameData);
    $scope.game.setConnected($scope.username);
  });

  $scope.mouseOver = function(player, row, col, $event) {
    if (! $scope.game.isPlayersTurn(player) ) return;

    if ($scope.game.board()[row][col] == '') {
      $event.target.style.cursor = 'pointer';
    }
  };

  $scope.mouseOut = function($event) {
    $event.target.style.cursor = 'default';
  };
}