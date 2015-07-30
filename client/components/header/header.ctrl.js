'use strict';

angular.module('header.ctrl', [])
    .controller('HeaderController', ['$scope', '$rootScope', function ($scope, $rootScope) {

        $scope.onOptionClick = function(args){
            $rootScope.$broadcast('onNavigationLinkClicked', args);
        }

    }]);