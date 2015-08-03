'use strict';

angular.module('footer.ctrl', [])
    .controller('FooterController', ['$scope', function ($scope) {

        $scope.fromController = 'Testing content rendered form footer controller';

    }]);