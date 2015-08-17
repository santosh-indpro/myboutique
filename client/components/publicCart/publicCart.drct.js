'use strict';

angular.module('publicCart.drct', [])
    .directive('ngPublicCart', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/publicCart/publicCart.tpl.html'
        };
    });