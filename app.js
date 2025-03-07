angular.module('validationApp', [])
    .controller('FormController', function($scope) {
        $scope.user = {};
        $scope.submitted = false;

        $scope.submitForm = function() {
            $scope.submitted = true;
            if ($scope.userForm.$valid) {
                alert("Form submitted successfully!");
            } else {
                alert("Please fill out the form correctly.");
            }
        };
    });
