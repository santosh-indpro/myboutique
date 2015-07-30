'use strict';

angular.module('productList.ctrl', [])
    .controller('ProductListController', ['$scope', function ($scope) {

        $scope.fromController = 'Testing content rendered form ProductList controller';

    }]);