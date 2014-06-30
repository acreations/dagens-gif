'use strict';

angular.module('dagensgif')

  .controller('DailyGifCtrl', function ($scope) {

    $scope.current = 'http://i.imgur.com/McyTTBA.gif';

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
