'use strict';

angular.module('footer.drct', [])
    .directive('ngUiFooter', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/footer/footer.tpl.html'
        };
    });