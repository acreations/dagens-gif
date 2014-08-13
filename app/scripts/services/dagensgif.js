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
    },
    sendYo:  function() {
      var deferred = $q.defer();
      var token = { 'api_token':'a7c0f2b6-9fbb-a687-b6b0-371e674ed5ec' };

      $http.post('http://api.justyo.co/yoall/', token, {
          
        }).success(function(response) {
            console.log("Yo sent");
            deferred.resolve()
        }).error(function(error) {
            console.log("ERROR");
            deferred.reject();
        });

        return deferred.promise;
    }
  };
}]);