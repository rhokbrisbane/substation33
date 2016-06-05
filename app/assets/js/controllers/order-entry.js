angular.module('app')
  .controller('OrderEntryCtrl', ['$scope', '$location', 'api_connector', function ($scope, $location, api_connector) {

    $scope.disableSubmit = false;

    $scope.master = {
      customer: {},
      driver: {},
      donation: {
        date: new Date().setHours(0,0,0,0),
        dateActual: new Date(),
        prescribed_weight: 0,
        nonprescribed_weight: 0,
        total_donation_weight: 0
      }
    };

    $scope.addCollectionInformation = function() {
      $scope.disableSubmit = true;
      api_connector.sendCollectionDetails($scope.form).then(function() {
        $location.path('#/orders');
      });
    };

    $scope.updateTotalWeight = function() {
      $scope.form.donation.total_donation_weight = $scope.form.donation.prescribed_weight + $scope.form.donation.nonprescribed_weight;
    };

    var key = $location.search().key;

    if (key) {
      api_connector.getOrderByKey(key).then(function(response) {
        
        $scope.form = angular.copy(response.data[key]);

        $scope.form._id = key;

        $scope.updateTotalWeight();

      });
    } else {
      $scope.form = angular.copy($scope.master);
    }


  }]);


