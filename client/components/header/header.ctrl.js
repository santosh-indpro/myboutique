'use strict';

angular.module('header.ctrl', [])
    .controller('HeaderController', ['$scope', '$rootScope', '$cookies', function ($scope, $rootScope, $cookies) {

        $scope.onOptionClick = function(args){
            $rootScope.$broadcast('onNavigationLinkClicked', args);
        }

        $scope.logoutUser = function(args){
            // Remove cookie
            //$cookies.remove(cookieKey);
            // Reset User info
            $rootScope.userInfo = {};
            // Redirect to home page
            $rootScope.$broadcast('onNavigationLinkClicked', args);
        };

    }]);