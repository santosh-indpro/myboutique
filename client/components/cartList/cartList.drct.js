'use strict';

angular.module('cartList.drct', [])
    .directive('ngCartList', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/cartList/cartList.tpl.html'
        };
    });