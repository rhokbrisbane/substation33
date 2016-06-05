angular.module('app')
  .controller('OrdersCtrl', ['$scope', 'api_connector', function ($scope, api_connector) {

    $scope.orders = [{
      name: 'blah1'
    }, {
      name: 'blah2'
    }, {
      name: 'blah3'
    }];

    $scope.onDateChange = function(e) {
      // TODO: get date from event
      $scope.getOrders(start);
    };

    $scope.getOrders = function(start) {
      var startDate = new Date(start.setHours(0,0,0,0));
      var endDate   = new Date(start.setHours(23,59,59,999));

      api_connector.getOrdersByDate(startDate, endDate).then(function (response) {
        $scope.orders = response;
      });
    };

    $scope.getOrders(new Date());
  
  }]);
