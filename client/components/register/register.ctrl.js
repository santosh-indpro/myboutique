'use strict';

angular.module('register.ctrl', [])
    .controller('RegisterController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

        $scope.registerInfo = {};
        $scope.registerFailStatus = false;

        $scope.registerUser = function(){

            if($scope.registerInfo.mobile && $scope.registerInfo.password && $scope.registerInfo.fullname){
                $scope.submitDataError = false;
                $scope.registerInfo.email = '';
                $http.post(''.url('/api/users/register/'), $scope.registerInfo).success(function(response) {
                    console.log("Register info response : ", response);
                    if(!response.status){
                        $scope.registerFailStatus = true;
                    } else {
                        $rootScope.$broadcast('onNavigationLinkClicked', 'login');
                        $rootScope.$broadcast('onRegisterSuccess');
                    }
                }).error(function(status) {
                    console.log('Error - ',status);
                });

            } else {
                $scope.submitDataError = true;
            }

        };

    }]);