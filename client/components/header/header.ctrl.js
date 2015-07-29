'use strict';

angular.module('header.ctrl', [])
    .controller('HeaderController', ['$scope', function ($scope) {

        $scope.fromController = 'Testing content rendered form header controller';

    }]);