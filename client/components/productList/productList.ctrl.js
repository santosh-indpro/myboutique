'use strict';

angular.module('productList.ctrl', [])
    .controller('ProductListController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

        $scope.productsCollection = [];

        $http.get(''.url('/api/products/with-users')).success(function(productsUsersCollection) {
            console.log("Products with users : ", productsUsersCollection);

            var modified_productsUsersCollection = [];
            $(productsUsersCollection).each(function(i,v){

                v.productInfo.description_dispaly = v.productInfo.description.substring(0, 50) + "....";
                modified_productsUsersCollection.push(v);
            });

            $scope.productsCollection = modified_productsUsersCollection;
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