var app = angular.module('todoApp', []);

app.controller('TodoController', function ($scope) {

    $scope.tasks = [];
    $scope.filterStatus = 'all';

    $scope.addTask = function () {
        if ($scope.newTask) {
            $scope.tasks.push({
                name: $scope.newTask,
                completed: false
            });
            $scope.newTask = '';
        }
    };

    $scope.removeTask = function (index) {
        $scope.tasks.splice(index, 1);
    };

    $scope.filterTasks = function (status) {
        $scope.filterStatus = status;
    };

    $scope.filteredTasks = function () {
        if ($scope.filterStatus === 'active') {
            return $scope.tasks.filter(task => !task.completed);
        } else if ($scope.filterStatus === 'completed') {
            return $scope.tasks.filter(task => task.completed);
        }
        return $scope.tasks;
    };
});
