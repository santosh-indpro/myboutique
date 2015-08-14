'use strict';

angular.module('register.drct', [])
    .directive('ngRegister', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/register/register.tpl.html'
        };
    });