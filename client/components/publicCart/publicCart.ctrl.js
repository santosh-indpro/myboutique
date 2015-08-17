'use strict';

angular.module('publicCart.ctrl', [])
    .controller('PublicCartController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

        var productId = '55cb14ecfdfeff94148c07c6';
        getProductDetailsById(productId);
        function getProductDetailsById(prdId){
            $rootScope.cartListing = [];
            $http.get(''.url('/api/products/' + prdId)).success(function(productDetails) {
                $rootScope.cartListing.push(productDetails);
            });
        }

        $scope.showPublicOrder = false;
        $scope.togglePublicOrderSection = function(){
            $scope.showPublicOrder = !$scope.showPublicOrder;
            $scope.orderInfo = {};
        };

        $scope.addPublicOrder = function(){
            var cartInfoArr = [], placeOrderObj = {};

            if($rootScope.cartListing.length > 0){
                angular.forEach($rootScope.cartListing, function(value, key) {
                    cartInfoArr.push({
                        productID: value._id,
                        ownerID: value.userID,
                        orderDate: Date.now(),
                        orderStatus: true,
                        orderConfirmDate: Date.now(),
                        orderConfirmStatus: false
                    });
                });
            }

            placeOrderObj = {
                userID: '',
                addressL1: $scope.orderInfo.addressL1,
                addressL2: $scope.orderInfo.addressL2,
                city: $scope.orderInfo.city,
                state: $scope.orderInfo.state,
                dealDesc: $scope.orderInfo.dealDesc,
                productsList: cartInfoArr
            };

            // Reset cart/order
            $scope.orderInfo = {};
            $rootScope.cartListing = [];

            console.log("Place Order info : ", placeOrderObj);
            $rootScope.$broadcast('onNavigationLinkClicked', 'productList');

            // Place order to DB
            /*$http.post(''.url('/api/transactions/'), placeOrderObj).success(function(status) {
                console.log('Success - ',status);
                $rootScope.$broadcast('onNavigationLinkClicked', 'productList');
            }).error(function(status) {
                console.log('Error - ',status);
            });*/

        };

    }]);