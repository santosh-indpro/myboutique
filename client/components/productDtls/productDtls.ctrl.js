'use strict';

angular.module('productDtls.ctrl', [])
    .controller('ProductDtlsController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

        $scope.addToCartContents = function(productId){
            $rootScope.$broadcast('onAddToCart', productId);
            $rootScope.$broadcast('onNavigationLinkClicked', 'cartList');
        };

        $scope.backToProductsList = function() {
            $rootScope.$broadcast('onNavigationLinkClicked', 'productList');
        }
    }]);