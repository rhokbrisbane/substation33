angular.module('app').service('api_connector', ['$http', function($http) {

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
    sendCollectionDetails: sendCollectionDetails
  };

}]);
