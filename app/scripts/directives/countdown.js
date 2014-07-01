'use strict';

angular.module('dagensgif')

.directive('countdown', function($interval, dateFilter) {
  return {
    restrict: 'A',
    transclude: false,
    scope: { format: '@' },
    link: function (scope, element) {

      var updateTime = function() {
        var now = new Date();

        var t = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

        var ms = t - now;

        // get hours    
        var h = parseInt(ms / (1000 * 60 * 60));
        ms -= (h * 1000 * 60 * 60);
        // get minutes
        var m = parseInt(ms / (1000 * 60));
        ms -= (m * 1000 * 60);
        // get seconds    
        var s = parseInt(ms / 1000);

        t.setHours(h);
        t.setMinutes(m);
        t.setSeconds(s);

        element.text(dateFilter(t, 'HH:mm:ss' ));
      };

      $interval(updateTime, 1000);
    }
  };
});