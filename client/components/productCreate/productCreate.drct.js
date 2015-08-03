'use strict';

angular.module('productCreate.drct', [])
    .directive('ngProductCreate', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/productCreate/productCreate.tpl.html'
        };
    });