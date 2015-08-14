'use strict';

angular.module('login.drct', [])
    .directive('ngLogin', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/login/login.tpl.html'
        };
    });