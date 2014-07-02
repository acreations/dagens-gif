'use strict';

angular.module('dagensgif')

.controller('MainCtrl', ['$scope', '$log', '$cookies', 'dateFilter','dagensgifRepository', '$timeout',
  function ($scope, $log, $cookies, dateFilter, dgr, $timeout) {

  $scope.settings = {};

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

  updateByCookies();
  updateBodyStyle();
}]);
