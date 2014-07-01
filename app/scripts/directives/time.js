'use strict';

angular.module('dagensgif')

.directive('time', function($interval, dateFilter) {
  return {
    restrict: 'A',
    transclude: false,
    scope: { format: '@' },
    link: function (scope, element) {

      var updateTime = function() {
        element.text(dateFilter(new Date(), scope.format ? scope.format : 'yyyy-MM-dd HH:mm:ss' ));
      };

      $interval(updateTime, 1000);
    }
  };
});