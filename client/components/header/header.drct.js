'use strict';

angular.module('header.drct', [])
    .directive('ngUiHeader', function () {
        return {
            restrict: 'E',
            templateUrl: 'header/header.tpl.html'
        };
    });