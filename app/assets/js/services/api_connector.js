angular.module('app')
  .service('api_connector', ['$http', function($http) {

    var baseUrl = 'http://localhost:8081/api/';

    var getOrdersByDate = function getOrdersByDate(date) {
      return $http({
        method: 'GET',
        url: baseURL + 'collections/' + date
      });
    };

    var getOrderByKey = function getOrderByKey(key) {
      return $http({
        method: 'GET',
        url: baseUrl + 'collection/' + key
      });
    };



    var sendCollectionDetails = function sendCollectionDetails(requestBody) {

      return $http({
        method: 'POST',
        url: baseUrl + 'collections',
        headers: {
          'Content-Type': 'application/json'
        },
        data: requestBody
      });

    };

    return {
      getOrdersByDate:        getOrdersByDate,
      getOrderByKey:          getOrderByKey,
      sendCollectionDetails:  sendCollectionDetails
    };

}]);
