'use strict';

angular.module('myboutiqueApp')
    .controller('MainCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

        // Client App config
        $rootScope.clientAppConfiguration = clientAppConfiguration;

        // User info
        $rootScope.userInfo = {};
        console.log("userInfo : ", $rootScope.userInfo);

        $rootScope.checkUserLoggedIn = function(){
            return angular.equals({}, $rootScope.userInfo);
        };

        // Initialize page render object
        $scope.renderPagesObj = {
            login: false,
            register: false,
            productList: false,
            productDetails: false,
            productCreate: false,
            cartList: false,
            orderList: false
        };

        // Initialize Uploaded images collection
        $rootScope.imageAdded = [];

        $rootScope.cartListing = [];

        // Detect phone
        $rootScope.onPhone = false;
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            $rootScope.onPhone = true;
            console.log("Device is ready!");
        }

        // Start Page
        renderSelectedPage('productList');

        // Navigate to selected page
        $scope.$on('onNavigationLinkClicked', function (event, args) {
            renderSelectedPage(args);
        });

        // Function to navigate to selected page
        function renderSelectedPage(selectedPage){
            for (var prop in $scope.renderPagesObj) {
                if ($scope.renderPagesObj.hasOwnProperty(prop) && selectedPage === prop) {
                    $scope.renderPagesObj[prop] = true;
                } else {
                    $scope.renderPagesObj[prop] = false;
                }
            }
        }

        // Get Product Details By Id
        $scope.$on('onGetProductDetailsById', function (event, productId) {
            $http.get(''.url('/api/products/' + productId)).success(function(productDetails) {
                $http.get(''.url('/api/users/owner/' + productDetails.userID)).success(function(ownerInfo) {
                    $scope.productImagesForCarousel = [];
                    $scope.productDetails = productDetails;
                    $scope.productDetails.ownerInfo = ownerInfo;
                    angular.forEach($scope.productDetails.images, function(value, key) {
                        $scope.productImagesForCarousel.push({
                            key: key,
                            imageUrl: $rootScope.clientAppConfiguration.serverApiBaseURL + '/' + value,
                            first: (key === 0)?(true):(false)
                        });
                    });
                });
            });
        });

        // Add to cart
        $scope.$on('onAddToCart', function (event, productId) {
            $http.get(''.url('/api/products/' + productId)).success(function(productDetails) {
                var addToCartStatus = true;
                if($rootScope.cartListing.length > 0){
                    angular.forEach($rootScope.cartListing, function(value, key) {
                        if(value._id === productId) {
                            addToCartStatus = false;
                        }
                    });
                }
                if(addToCartStatus){
                    $rootScope.cartListing.push(productDetails);
                }
            });
        });

    }]);
