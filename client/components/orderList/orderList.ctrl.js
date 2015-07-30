'use strict';

angular.module('orderList.ctrl', [])
    .controller('OrderListController', ['$scope', function ($scope) {

        $scope.fromController = 'Testing content rendered form OrderList controller';

    }]);