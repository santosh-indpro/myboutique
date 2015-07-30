'use strict';

angular.module('productList.drct', [])
    .directive('ngProductList', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/productList/productList.tpl.html'
        };
    });