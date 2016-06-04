var app = angular.module('app');

app.controller('UsersCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.users = [{
        name: 'Drew'
    }, {
        name: 'Chris'
    }, {
        name: 'Mike'
    }];
}]);


