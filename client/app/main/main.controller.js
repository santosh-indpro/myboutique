'use strict';

angular.module('myboutiqueApp')
    .controller('MainCtrl', function ($scope, $rootScope, $http) {

        $scope.renderProductListing = false;
        $scope.renderOrderListing = false;
        $scope.renderProductDetails = false;

        $scope.$on('onNavigationLinkClicked', function (event, args) {
            if(args === 'productList'){
                $scope.renderProductListing = !$scope.renderProductListing;
                $scope.renderProductDetails = false;
                $scope.renderOrderListing = false;
            } else if(args === 'productDetails'){
                $scope.renderProductDetails = !$scope.renderProductDetails;
                $scope.renderProductListing = false;
                $scope.renderOrderListing = false;
            } else if(args === 'orderList'){
                $scope.renderOrderListing = !$scope.renderOrderListing;
                $scope.renderProductListing = false;
                $scope.renderProductDetails = false;
            }
        });

        /*$scope.resetAllRendering = function (){

        };*/

        $scope.$on('onGetProductDetailsById', function (event, productId) {
            $http.get(''.url('/api/products/' + productId)).success(function(productDetails) {
                console.log("Product details - ", productDetails);
                $scope.productDetails = productDetails;
            });
        });

    });
