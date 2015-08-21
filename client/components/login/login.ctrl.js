'use strict';

angular.module('login.ctrl', [])
    .controller('LoginController', ['$scope', '$rootScope', '$http', '$cookies', function ($scope, $rootScope, $http, $cookies) {
        $scope.loginInfo = {};
        $scope.loginFailStatus = false;

        $scope.checkLoginInfo = function(){
            $rootScope.registerSuccessMsg = false;
            if($scope.loginInfo.mobile && $scope.loginInfo.password){
                $scope.submitDataError = false;
                $http.post(''.url('/api/users/login/'), $scope.loginInfo).success(function(response) {
                    console.log("User info response : ", response);
                    if(response.length === 0){
                        $scope.loginFailStatus = true;
                    } else {
                        $rootScope.userInfo = response[0];
                        //saveInCookie(response[0]);
                        console.log("$rootScope.userInfo", $rootScope.userInfo);
                        $rootScope.$broadcast('onNavigationLinkClicked', 'productList');
                    }
                }).error(function(status) {
                    console.log('Error - ',status);
                });
            } else {
                $scope.submitDataError = true;
            }
        };

        // Save in cookie
        function saveInCookie(userInfo){
            $cookies.remove(cookieKey);
            $cookies.putObject(cookieKey, userInfo);
            //console.log("$cookies get login : ", $cookies.getObject(cookieKey));
            return $cookies.getObject(cookieKey);
        }

    }]);