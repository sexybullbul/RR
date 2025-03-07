app.controller('StudentController', ['$scope', '$http', function ($scope, $http) {
    const apiUrl = 'http://localhost:3000/api/students';

    $scope.student = {};

    $scope.students = [];

    function getAllStudents() {
        $http.get(apiUrl)
            .then(function (response) {
                $scope.students = response.data;
            })
            .catch(function (error) {
                console.error("Error fetching students: ", error);
            });
    }

    getAllStudents();

    $scope.addOrUpdateStudent = function () {
        if ($scope.student._id) {
            $http.put(apiUrl + '/' + $scope.student._id, $scope.student)
                .then(function (response) {
                    getAllStudents();
                    $scope.student = {};
                })
                .catch(function (error) {
                    console.error("Error updating student: ", error);
                });
        } else {
            $http.post(apiUrl, $scope.student)
                .then(function (response) {
                    getAllStudents();
                    $scope.student = {};
                })
                .catch(function (error) {
                    console.error("Error adding student: ", error);
                });
        }
    };

    $scope.editStudent = function (student) {
        $scope.student = angular.copy(student);
    };

    $scope.deleteStudent = function (studentId) {
        $http.delete(apiUrl + '/' + studentId)
            .then(function (response) {
                getAllStudents();
            })
            .catch(function (error) {
                console.error("Error deleting student: ", error);
            });
    };
}]);
