'use strict';

angular.module('header.ctrl', [])
    .controller('HeaderController', ['$scope', '$rootScope', '$cookies', function ($scope, $rootScope, $cookies) {

        $scope.onOptionClick = function(args){
            $rootScope.$broadcast('onNavigationLinkClicked', args);
        }

        $scope.logoutUser = function(){
            // Remove cookie
            $cookies.remove('MyBtqCk');
            $rootScope.userInfo = {};
        };

    }]);