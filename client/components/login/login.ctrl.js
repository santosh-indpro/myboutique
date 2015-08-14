'use strict';

angular.module('login.ctrl', [])
    .controller('LoginController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
        $scope.loginInfo = {};
        $scope.loginFailStatus = false;

        $scope.checkLoginInfo = function(){
            $http.post(''.url('/api/users/login/'), $scope.loginInfo).success(function(response) {
                console.log("User info response : ", response);
                if(response.length === 0){
                    $scope.loginFailStatus = true;
                } else {
                    $rootScope.userInfo = response[0];
                    $rootScope.$broadcast('onNavigationLinkClicked', 'productList');
                }
            }).error(function(status) {
                console.log('Error - ',status);
            });

        };

    }]);