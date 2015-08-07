'use strict';

angular.module('cartList.ctrl', [])
    .controller('CartListController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

        $scope.cartShow = true;

        $scope.removeItem = function(productId){
            // Remove selected item from cart
            $rootScope.cartListing = $rootScope.cartListing.filter(function (el) {
                return el._id !== productId;
            });
        };

        $scope.showPlaceOrder = function(){
            $scope.orderInfo = {};
            $scope.orderInfo.country = { id: 1 };
            $scope.cartShow = false;
        };

        $scope.addPlaceOrder = function(){
            console.log("Order info : ", $scope.orderInfo);
            console.log("Cart info : ", $rootScope.cartListing);
        };

    }]);