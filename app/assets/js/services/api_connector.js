angular.module('app')
  .service('api_connector', ['$http', '$location', function($http, $location) {

    console.log($location.$$host);

    var baseUrl = $location.$$host == 'localhost' ? 'http://localhost:8081/api/' : 'https://substation33.herokuapp.com/api/';

    var getOrdersByDate = function getOrdersByDate(date) {
      return $http({
        method: 'GET',
        url: baseUrl + 'collections/' + date
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
        url: baseUrl + 'collection' + (requestBody._id ? ('?key=' + requestBody._id) : ''),
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
