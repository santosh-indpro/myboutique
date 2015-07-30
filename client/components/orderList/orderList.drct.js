'use strict';

angular.module('orderList.drct', [])
    .directive('ngOrderList', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/orderList/orderList.tpl.html'
        };
    });