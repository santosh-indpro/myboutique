'use strict';

angular.module('mainMenu.ctrl', [])
    .controller('mainMenuController', ['$scope', '$rootScope', function ($scope, $rootScope) {

        $scope.onOptionClick = function(args){
            $rootScope.$broadcast('onNavigationLinkClicked', args);
        }

    }]);