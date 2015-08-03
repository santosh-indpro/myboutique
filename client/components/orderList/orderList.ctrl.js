'use strict';

angular.module('orderList.ctrl', [])
    .controller('OrderListController', ['$scope', '$http', function ($scope, $http) {

        $http.get(''.url('/api/transactions')).success(function(orderListCollection) {
            $scope.orderListCollection = orderListCollection;
        });

    }]);