
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

        var keys = Object.keys(word_array_A);
        $scope.validWord = "";
        //console.log("A words = " +keys);

        if ($scope.newWord.indexOf("A") == 0) {
          if (keys.indexOf($scope.newWord) != -1) {
            $scope.words.add({
              from: $scope.username,
              content: $scope.newWord,
              points: $scope.newWord.length
            });
            $scope.newWord = "";
          } else {
            $scope.validWord = "invalid";
          }
        } else {
          $scope.validWord = "invalid";
        }
      }
      if ($scope.validWord == "invalid") {
        $('#invalidAlert').show().fadeOut(2000);
        //$('#invalidAlert').hide();
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