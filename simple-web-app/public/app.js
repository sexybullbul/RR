var app = angular.module('myApp', []);

app.controller('itemsController', function($scope, $http) {
  $http.get('http://localhost:3000/api/items')
    .then(function(response) {
      $scope.items = response.data;
    }, function(error) {
      console.log("Error: " + error);
    });
});
