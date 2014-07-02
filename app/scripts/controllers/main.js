'use strict';

angular.module('dagensgif')

.controller('MainCtrl', ['$scope', '$log', function ($scope, $log) {

  $scope.settings = {};

  $scope.settings.saved = {
    'title': 'Dagens GIF',
    'bgcolor': '#ff00ff',
    'color': '#000000'
  }

  $scope.reset = function() {
    $log.debug('Reset main controller');

    $scope.settings.updates = JSON.parse(JSON.stringify($scope.settings.saved));
  };

  $scope.saveSettings = function() {
    $scope.settings.saved = JSON.parse(JSON.stringify($scope.settings.updates));

    updateBodyStyle($scope.settings.saved);
  }

  var updateBodyStyle = function(settings) {
    $scope.bodyStyle = {
      'background-color': settings.bgcolor,
      'color': settings.color
    }
  };

  updateBodyStyle($scope.settings.saved);

}]);
