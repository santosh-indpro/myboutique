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
            $scope.cartShow = false;
        };

        $scope.addPlaceOrder = function(){

            if($scope.orderInfo.addressL1 && $scope.orderInfo.addressL2 && $scope.orderInfo.city && $scope.orderInfo.state && $scope.orderInfo.dealDesc){

                $scope.submitDataError = false;

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
                    orderSenderFullname: $scope.userInfo.fullname,
                    orderSenderMobile: $scope.userInfo.mobile,
                    addressL1: $scope.orderInfo.addressL1,
                    addressL2: $scope.orderInfo.addressL2,
                    city: $scope.orderInfo.city,
                    state: $scope.orderInfo.state,
                    dealDesc: $scope.orderInfo.dealDesc,
                    productsList: cartInfoArr
                };

                console.log("Place Order info : ", placeOrderObj);

                // Reset cart/order
                $scope.orderInfo = {};
                $rootScope.cartListing = [];

                // Place order to DB
                $http.post(''.url('/api/transactions/'), placeOrderObj).success(function(status) {
                    console.log('Success - ',status);
                    $rootScope.$broadcast('onNavigationLinkClicked', 'productList');
                }).error(function(status) {
                    console.log('Error - ',status);
                });

            } else {
                $scope.submitDataError = true;
            }

        };

    }]);