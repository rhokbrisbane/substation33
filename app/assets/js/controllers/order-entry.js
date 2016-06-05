angular.module('app')
  .controller('OrderEntryCtrl', ['$scope', 'api_connector', function ($scope, api_connector) {

    $scope.master = {
      customer: {},
      driver: {},
      donation: {
        prescribed_weight: 0,
        nonprescribed_weight: 0,
        total_donation_weight: 0
      }
    };

    $scope.form = angular.copy($scope.master);

    $scope.addCollectionInformation = function() {
      api_connector.sendCollectionDetails($scope.form).then(function() {
        
      });
    };

    $updateTotalWeight = function() {
      form.donation.total_donation_weight = form.donation.prescribed_weight + form.donation.nonprescribed_weight;
    };
    
    

  }]);


