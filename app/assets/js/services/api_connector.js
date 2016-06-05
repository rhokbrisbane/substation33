angular.module('app')
  .service('api_connector', ['$http', function($http) {

    var getOrders = function getOrders() {
      requestBody = {

      };

      return $http({
        method: 'POST',
        url: 'http://localhost:8080/api/orders',
        headers: {
          'Content-Type': 'application/json'
        },
        data: requestBody
      });

    };

    var sendCollectionDetails = function sendCollectionDetails(requestBody) {

      requestBody = {
        // ...test body goes here
      };

      return $http({
        method: 'POST',
        url: 'http://localhost:8080/api/collection',
        headers: {
          'Content-Type': 'application/json'
        },
        data: requestBody
      });

    };

    return {
      getOrders: getOrders,
      sendCollectionDetails: sendCollectionDetails
    };

}]);
