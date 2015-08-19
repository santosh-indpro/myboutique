'use strict';

angular.module('productList.ctrl', [])
    .controller('ProductListController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

        $scope.productsCollection = [];

        $http.get(''.url('/api/products/with-users')).success(function(productsUsersCollection) {
            console.log("Products with users : ", productsUsersCollection);
            $scope.productsCollection = productsUsersCollection;
        });

        $scope.showProductDetails = function(pageToRedirect, productId){
            $rootScope.$broadcast('onNavigationLinkClicked', pageToRedirect);
            $rootScope.$broadcast('onGetProductDetailsById', productId);
        };

        $scope.redirectToLogin = function(){
            $rootScope.$broadcast('onNavigationLinkClicked', 'login');
        };

        $scope.redirectToCreateItem = function(){
            $rootScope.$broadcast('onNavigationLinkClicked', 'productCreate');
        };

    }]);