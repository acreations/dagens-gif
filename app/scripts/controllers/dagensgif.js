'use strict';

angular.module('dagensgif')

.controller('DagensGifCtrl', ['$scope', '$log', 'dateFilter','dagensgifRepository', function ($scope, $log, dateFilter, dgr) {

  $scope.reload = function() {
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
}]);
