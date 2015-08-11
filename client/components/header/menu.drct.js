'use strict';

angular.module('menu.drct', [])
    .directive('ngMainMenu', function () {

        function link(scope, element, attrs) {
            // Toggle menu
            $('ul.navbar-nav li').on('click', function(){
                $('button.navbar-toggle').trigger('click');
            });
        }

        return {
            restrict: "AE",
            link: link
        };

    });
