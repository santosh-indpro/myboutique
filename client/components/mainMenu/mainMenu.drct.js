'use strict';

angular.module('mainMenu.drct', [])
    .directive('ngUiMainMenu', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/mainMenu/mainMenu.tpl.html'
        };
    });