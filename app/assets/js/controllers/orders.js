angular.module('app')
  .controller('OrdersCtrl', ['$scope', 'api_connector', function ($scope, api_connector) {

    $scope.orders = [{
      name: 'blah1'
    }, {
      name: 'blah2'
    }, {
      name: 'blah3'
    }];

    var objectToArray = function(object) {
      return Object.keys(object).map(function(key) {
        var item = object[key];
        item._id = key;
        console.log(item);
        return item;
      });
    };

    $scope.onDateChange = function(e) {
      // TODO: get date from event
      //$scope.getOrders(start);
    };

    $scope.getOrders = function(start) {
      var startDate = new Date(start.setHours(0,0,0,0)).getTime();

      api_connector.getOrdersByDate(startDate).then(function (response) {

        $scope.orders = objectToArray(response.data);
      });
    };

    $scope.getOrders(new Date());
  
  }]);
