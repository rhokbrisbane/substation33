var app = angular.module('app', [
  'ngRoute',
  'ui.bootstrap',
  'restangular',
  'pasvaz.bindonce'
]);

app.run(function ($rootScope, $http, $location, $route) {

});

app.config(function ($routeProvider) {
  $routeProvider.
    when('/orders', {
      templateUrl: 'assets/partials/orders/index.html',
      controller: 'OrdersCtrl',
      active: 'home'
    }).
    when('/orders/edit', {
      templateUrl: 'assets/partials/orders/entry-form.html',
      controller: 'OrderEntryCtrl',
      active: 'users'
    }).
    otherwise({
      redirectTo: '/orders'
    });
});
