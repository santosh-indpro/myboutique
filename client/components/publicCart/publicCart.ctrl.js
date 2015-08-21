'use strict';

angular.module('publicCart.ctrl', [])
    .controller('PublicCartController', ['$scope', '$rootScope', '$http', '$window','reCAPTCHA', function ($scope, $rootScope, $http, $window, reCAPTCHA) {
        var qryStr = $window.location.search,
            qryStrId = '?id=',
            productId = qryStr.slice(qryStrId.length);

        console.log("PrdId : ",productId);

        getProductDetailsById(productId);
        function getProductDetailsById(prdId){
            $rootScope.cartListing = [];
            $http.get(''.url('/api/products/' + prdId)).success(function(productDetails) {
                $rootScope.cartListing.push(productDetails);
            });
        }

        $scope.showPublicOrder = false;
        $scope.showSuccessPublicOrder = false;
        $scope.togglePublicOrderSection = function(){
            $scope.showPublicOrder = !$scope.showPublicOrder;
            $scope.orderInfo = {};
        };

        $scope.addPublicOrder = function(){

            if($scope.orderInfo.orderSenderFullname && $scope.orderInfo.orderSenderMobile && $scope.orderInfo.addressL1 && $scope.orderInfo.addressL2 && $scope.orderInfo.city && $scope.orderInfo.state && $scope.orderInfo.dealDesc){
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
                    orderSenderFullname: $scope.orderInfo.orderSenderFullname,
                    orderSenderMobile: $scope.orderInfo.orderSenderMobile,
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

                // Place order to DB
                $http.post(''.url('/api/transactions/'), placeOrderObj).success(function(status) {
                    console.log('Success - ',status);
                    $scope.showPublicOrder = false;
                    $scope.showSuccessPublicOrder = true;
                }).error(function(status) {
                    console.log('Error - ',status);
                });

            } else {
                $scope.submitDataError = true;
            }

        };

    }]);