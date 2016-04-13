'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
.controller('View1Ctrl', function($scope, $http) {
    var getUserTimeLine = function()
    {
        $http.get("/api/getUserTimeLine/earlxsweat")
            .then(function(response) {
                $scope.timeLine = response.data;
                $scope.user = response.data[0].user;

                console.log("timeLine = "+JSON.stringify($scope.timeLine))  ;
                console.log("User = "+$scope.user);
            });
    };

    getUserTimeLine();
});