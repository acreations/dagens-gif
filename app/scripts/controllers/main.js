'use strict';

angular.module('dagensgif')

.controller('MainCtrl', ['$scope', '$log', '$cookies', 'dateFilter','dagensgifRepository', '$timeout',
  function ($scope, $log, $cookies, dateFilter, dgr, $timeout) {

  $scope.settings = {};
  $scope.state = 'today';
  $scope.url = '';
  $scope.name = '';
  $scope.hasVoted = false;

  $scope.settings.saved = {
    'title': 'Dagens GIF',
    'bgcolor': '#ffffff',
    'color': '#000000',
    'gifColorAsBackground': true
  };

  $scope.refresh = function() {
    var today = dateFilter(new Date(), 'yyyy-MM-dd');

    $log.debug('Reload dagensgif controller for ' + today);

    dgr.get(today).then(
        function(data) {
          $log.debug('Got dagensgif', data);

          $scope.image = data.image;
        },
        function(error) {
          $log.error('Failed to get dagensgif', error);
        }
    );
  };

  $scope.reset = function() {
    $log.debug('Reset main controller');

    $scope.settings.updates = JSON.parse(JSON.stringify($scope.settings.saved));
  };

  $scope.saveSettings = function() {
    $scope.settings.saved = JSON.parse(JSON.stringify($scope.settings.updates));

    saveInCookies();
    updateBodyStyle();
  };

  var saveInCookies = function() {
    $log.debug('Save settings in cookies');

    $cookies.title = $scope.settings.saved.title;
    $cookies.bodyBackgroundColor = $scope.settings.saved.bgcolor;
    $cookies.bodyTextColor = $scope.settings.saved.color;
    $cookies.gifColorAsBackground = $scope.settings.saved.gifColorAsBackground;
  };

  var updateBodyStyle = function() {
    $log.debug('Update body styles');
    $scope.bodyStyle = {
      'background-color': $scope.settings.saved.bgcolor,
      'color': $scope.settings.saved.color
    };
  };

  var updateByCookies = function() {
    $log.debug('Check if something saved in cookies');

    if($cookies.title) {
      $scope.settings.saved.title = $cookies.title;
    }
    
    if($cookies.bodyBackgroundColor) {
      $scope.settings.saved.bgcolor = $cookies.bodyBackgroundColor;
    }
    
    if($cookies.bodyTextColor) {
      $scope.settings.saved.color = $cookies.bodyTextColor;
    }

    if($cookies.gifColorAsBackground) {
      $scope.settings.saved.gifColorAsBackground = $cookies.gifColorAsBackground;
    }
  };

  $scope.reload = function() {
    var dailyGif = new Firebase('https://blazing-fire-1815.firebaseio.com/-JQsiwN-QJMFiEsUgTn3');

    dailyGif.on('value', function(response) {
      if(response.val() == null) {
        $log.error('Failed to get dagensgif');
      }
      else {
        var gif = response.val();
        $scope.image = gif.image;
        $scope.by = gif.by;
      }
    });

    $scope.hasVoted = $cookies.hasVoted;
  };

  $scope.addGif = function() {
    var addGif = new Firebase('https://blazing-fire-1815.firebaseio.com/gifs');
    var returnsReference = addGif.push({ image: $scope.url, by: $scope.name, votes: 0, reference: '' });
    var reference = returnsReference.name();

    addGif.child(reference).update({ reference: reference });
  };

  $scope.showGifs = function() {
    var showGifs = new Firebase('https://blazing-fire-1815.firebaseio.com/gifs');
    $scope.showGifs = {};

    var fourGifs = showGifs.startAt().limit(4);

    fourGifs.on('value', function(response) {
      $scope.showGifs = response.val();
    });
  };

  $scope.addVote = function(reference) {
    if(!$scope.hasVoted) {
      var addVote = new Firebase('https://blazing-fire-1815.firebaseio.com/gifs');

      addVote.child(reference).transaction(function(response) {
        response.votes = response.votes + 1;
        return response;
      });

      $cookies.hasVoted = true;
      $scope.hasVoted = $cookies.hasVoted;
    }
  };

  $scope.changeGif = function() {
    var changeGif = new Firebase('https://blazing-fire-1815.firebaseio.com/gifs');
    
    var mostVotes = 0;
    var reference = '';
    var newGif = {};

    var fourGifs = changeGif.startAt().limit(4);

    fourGifs.on('value', function(response) {
      response.forEach(function(gif) {
          if(gif.votes > mostVotes) {
            mostVotes = gif.votes();
            reference = gif.name();
            newGif = gif.val();
          }
      });
    });

    var dailyGif = new Firebase('https://blazing-fire-1815.firebaseio.com/-JQsiwN-QJMFiEsUgTn3');

    dailyGif.update({ image: newGif.image, by: newGif.by });

    var removeGif = new Firebase('https://blazing-fire-1815.firebaseio.com/gifs');

    removeGif.child(reference).remove();

  };

  updateByCookies();
  updateBodyStyle();
}]);
