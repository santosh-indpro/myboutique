'use strict';

angular.module('header.drct', [])
    .directive('ngUiHeader', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/header/header.tpl.html'
        };
    });