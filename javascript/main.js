
wordApp.controller('SplashCtrl', ['$scope', '$timeout', 'angularFireCollection',
  function($scope, $timeout, angularFireCollection) {

    var url = 'https://word-gaming.firebaseio.com/words';
    $scope.words = angularFireCollection(new Firebase(url).limit(15));

    $scope.username = 'Guest' + Math.floor(Math.random()*101);

    $scope.usedWords = [];

    $scope.letters = "A";

    $scope.deleteAll = function() {
      var allWords = new Firebase('https://word-gaming.firebaseIO-demo.com/words/');
      allWords.remove();
    };

    $scope.addWord = function() {
      if ($scope.newWord != null) {
        $scope.newWord = $scope.newWord.toUpperCase();

        var keys = Object.keys(word_array_A);
        $scope.validWord = "";
        //console.log("A words = " +keys);

        console.log("usedWords = " + $scope.usedWords);

        if ($scope.newWord.indexOf("A") == 0) {
          if (keys.indexOf($scope.newWord) != -1 && $scope.usedWords.indexOf($scope.newWord) == -1) {

            $scope.words.add({
              from: $scope.username,
              content: $scope.newWord,
              points: $scope.newWord.length
            });
            $scope.usedWords.push($scope.newWord);

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
    };


    var ref = new Firebase('https://word-gaming.firebaseio.com');

    var auth = new FirebaseSimpleLogin(ref, function(error, user) {
      if (error) {
        // an error occurred while attempting login
        alert(error);
      } else if (user) {

        var get_url='https://graph.facebook.com/'+ user.id +'/?fields=picture&access_token='+user.accessToken;

        console.log("get_url: " + get_url);

        $.getJSON(get_url, function(data) {
          var items = [];
          _userPhoto = data.picture.data.url;

          console.log("photo_url;: " + data.picture.data.url);


          //document.getElementById("image").innerHTML="<img src='" +  data.picture.data.url+"'>";
          //document.getElementById("userName").innerHTML=user.displayName;

          //var newUserRef = new Firebase('https://word-gaming.firebaseio.com/users/');
          //passing useri
          //newUserRef.set(user.id);
          $scope.username = user.displayName;
          $scope.userid = user.id;
          $scope.userPicture = _userPhoto;

          //:{username : user.displayName , photo : data.picture.data.url} });

        });

      }
    });

    // attempt to log the user in with your preferred authentication provider
    auth.login('facebook', {
      rememberMe: true,
      scope: 'email,user_likes,user_photos'
    });

  }



]);

wordApp.directive('autoScroll', function($timeout) {
  return function(scope, elements, attrs) {
    scope.$watch("words.length", function() {
      $timeout(function() {
        elements[0].scrollTop = elements[0].scrollHeight
      });
    });
  }
});