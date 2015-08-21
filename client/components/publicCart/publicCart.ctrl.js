'use strict';

angular.module('publicCart.ctrl', [])
    .controller('PublicCartController', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
        var qryStr = $window.location.search,
            qryStrId = '?id=',
            productId = qryStr.slice(qryStrId.length);

        var captcha = visualCaptcha( 'sample-captcha', {
            imgPath: 'img/',
            captcha: {
                numberOfImages: 3
            }
        } );
        var statusElement = document.getElementById( 'status-message' );

        // Show an alert saying if visualCaptcha is filled or not
        var _sayIsVisualCaptchaFilled = function() {
            if (!captcha.getCaptchaData().valid ) {
                statusElement.innerHTML = "";
                statusElement.innerHTML = '<div class="status"> <div class="icon-no"></div> <p>Please fill captcha!</p> </div>' + statusElement.innerHTML;
                //$scope.opNotification.send("error", "Error!", "Please fill captcha!");
            }
            else{
                _captchaValidation();
            }
        };

        var _captchaValidation = function(){
            var validImage = "validImage";
            var validAudio = "validAudio";
            var valid = false;
            $.ajax({
                url: "try",
                type: "POST",
                data: $( "#captchaForm" ).serialize(),
                success: function(data, textStatus, jqXHR)
                {
                    var //statusElement = document.getElementById( 'status-message' ),
                        queryString = window.location.search;

                    statusElement.innerHTML = "";
                    var queryString = data;

                    console.log(data);
                    if(data.indexOf(validAudio) > 0){
                        valid = true;
                    }else if(data.indexOf(validImage) > 0){
                        valid = true;
                    }

                    if(valid === true){
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
                    }
                    else{
                        // Show success/error messages
                        if ( queryString.indexOf('noCaptcha') !== -1 ) {
                            statusElement.innerHTML = '<div class="status"> <div class="icon-no"></div> <p>visualCaptcha was not started!</p> </div>' + statusElement.innerHTML;
                        } else if ( queryString.indexOf('validImage') !== -1 ) {
                            statusElement.innerHTML = '<div class="status valid"> <div class="icon-yes"></div> <p>Image was valid!</p> </div>' + statusElement.innerHTML;
                        } else if ( queryString.indexOf('failedImage') !== -1 ) {
                            statusElement.innerHTML = '<div class="status"> <div class="icon-no"></div> <p>Image was NOT valid!</p> </div>' + statusElement.innerHTML;
                        } else if ( queryString.indexOf('validAudio') !== -1 ) {
                            statusElement.innerHTML = '<div class="status valid"> <div class="icon-yes"></div> <p>Accessibility answer was valid!</p> </div>' + statusElement.innerHTML;
                        } else if ( queryString.indexOf('failedAudio') !== -1 ) {
                            statusElement.innerHTML = '<div class="status"> <div class="icon-no"></div> <p>Accessibility answer was NOT valid!</p> </div>' + statusElement.innerHTML;
                        } else if ( queryString.indexOf('failedPost') !== -1 ) {
                            statusElement.innerHTML = '<div class="status"> <div class="icon-no"></div> <p>No visualCaptcha answer was given!</p> </div>' + statusElement.innerHTML;
                        }
                    }
                }
            });
        };

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

            _sayIsVisualCaptchaFilled();

        };

    }]);