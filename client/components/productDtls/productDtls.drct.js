'use strict';

angular.module('productDtls.drct', [])
    .directive('ngProductDtls', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/productDtls/productDtls.tpl.html'
        };
    });