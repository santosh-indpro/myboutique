'use strict';

angular.module('login.ctrl', [])
    .controller('LoginController', ['$scope', '$rootScope', '$http', '$cookies', function ($scope, $rootScope, $http, $cookies) {
        $scope.loginInfo = {};
        $scope.loginFailStatus = false;

        $scope.checkLoginInfo = function(){
            $http.post(''.url('/api/users/login/'), $scope.loginInfo).success(function(response) {
                console.log("User info response : ", response);
                if(response.length === 0){
                    $scope.loginFailStatus = true;
                } else {
                    $rootScope.userInfo = saveInCookie(response[0]);
                    $rootScope.$broadcast('onNavigationLinkClicked', 'productList');
                }
            }).error(function(status) {
                console.log('Error - ',status);
            });

        };

        // Save in cookie
        function saveInCookie(userInfo){
            var cookieKey = 'MyBtqCk';
            $cookies.remove(cookieKey);
            $cookies.putObject(cookieKey, userInfo);
            //console.log("$cookies get login : ", $cookies.getObject(cookieKey));
            return $cookies.getObject(cookieKey);
        }

    }]);