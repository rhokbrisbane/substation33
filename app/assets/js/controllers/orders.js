angular.module('app')
  .controller('OrdersCtrl', ['$scope', 'api_connector', function ($scope, api_connector) {

    $scope.orders = [{
      name: 'blah1'
    }, {
      name: 'blah2'
    }, {
      name: 'blah3'
    }];

    /*api_connector.getOrders().then(function (response) {
      console.log(response);
      $scope.orders = response;
    });*/

  }]);


