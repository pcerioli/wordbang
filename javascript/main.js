
wordApp.controller('SplashCtrl', ['$scope', '$timeout', 'angularFireCollection',
  function($scope, $timeout, angularFireCollection) {

    var url = 'https://word-gaming.firebaseio.com/words';
    $scope.words = angularFireCollection(new Firebase(url).limit(15));

    $scope.username = 'Guest' + Math.floor(Math.random()*101);


    $scope.letters = "A";

    $scope.deleteAll = function() {
      var allWords = new Firebase('https://word-gaming.firebaseIO-demo.com/words/');
      allWords.remove();
    }

    $scope.addWord = function() {
      if ($scope.newWord != null) {
        $scope.newWord = $scope.newWord.toUpperCase();
        if ($scope.newWord.indexOf("A") == 0) {
          $scope.words.add({
            from: $scope.username,
            content: $scope.newWord,
            points: $scope.newWord.length
          });
          $scope.newWord = "";
        }
      }
    }


  }
])
wordApp.directive('autoScroll', function($timeout) {
  return function(scope, elements, attrs) {
    scope.$watch("words.length", function() {
      $timeout(function() {
        elements[0].scrollTop = elements[0].scrollHeight
      });
    });
  }
});