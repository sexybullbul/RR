var app = angular.module('errorHandlingApp', []);

app.factory('errorInterceptor', function ($q) {
    return {
        responseError: function (rejection) {
            if (rejection.status === 404) {
                alert('Error 404: Resource Not Found!');
            } else if (rejection.status === 500) {
                alert('Error 500: Internal Server Error!');
            } else {
                alert('An unexpected error occurred!');
            }
            return $q.reject(rejection);
        }
    };
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('errorInterceptor');
});

app.controller('MainController', function ($scope, $http) {

    $scope.data = [];
    $scope.error = false;
    $scope.errorMessage = '';

    $scope.fetchData = function () {
        // https://trefle.io/api/v1/plants?token=pmtSEsRgCFunuz5KklQ_I_ny2XC_48x3HBeYScRCDkw&filter[common_name]=beach%20strawberry
        $http.get('https://jsonplaceholder.typicode.com/posts')
            .then(function (response) {
                $scope.data = response.data;
                $scope.error = false;
            })
            .catch(function (error) {
                $scope.error = true;
                $scope.errorMessage = 'Failed to fetch data. Please try again later.';
            });
    };
});
