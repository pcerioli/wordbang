
wordApp.controller('SplashCtrl', ['$scope', '$timeout', 'angularFireCollection',
  function($scope, $timeout, angularFireCollection) {

    var url = 'https://word-gaming.firebaseio.com/words';
    $scope.words = angularFireCollection(new Firebase(url).limit(15));

    $scope.username = 'Guest' + Math.floor(Math.random()*101);


    $scope.letters = "AL";

    $scope.addWord = function() {
      if ($scope.newWord != null) {
        $scope.words.add({from: $scope.username, content: $scope.newWord});
        $scope.newWord = "";
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