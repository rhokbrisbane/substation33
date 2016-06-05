'use strict';

angular.module('app')
  .directive('order', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        order: '='
      },
      templateUrl: 'assets/partials/orders/order.html',
      link: function(scope) {

      }
    };
  });
