'use strict';

angular.module('productList.ctrl', [])
    .controller('ProductListController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

        $http.get(''.url('/api/products')).success(function(productsCollection) {
            $scope.productsCollection = productsCollection;
        });

        $scope.showProductDetails = function(pageToRedirect, productId){
            $rootScope.$broadcast('onNavigationLinkClicked', pageToRedirect);
            $rootScope.$broadcast('onGetProductDetailsById', productId);
        }

    }]);