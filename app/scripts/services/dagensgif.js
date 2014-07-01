'use strict';

angular.module('dagensgif')

.factory('dagensgifRepository', ['$q', '$http', function($q, $http) {

  var serviceUrl = 'resources/dagensgif.json';

  return {
    get: function(date) {
      console.log('date', date);
      var deferred = $q.defer();

      $http.get(serviceUrl).success(function(response) {
        deferred.resolve(response);
      });

      return deferred.promise;
    }
  };
}]);