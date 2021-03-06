'use strict';

angular.module('myboutiqueApp')
    .controller('MainCtrl', ['$scope', '$http', '$rootScope', '$cookies', function ($scope, $http, $rootScope, $cookies) {

        // Client App config
        $rootScope.clientAppConfiguration = clientAppConfiguration;

        initUserInfo();
        function initUserInfo(){
            $rootScope.userInfo = {};
        }

        // Check Cookie
        //checkCookie();
        function checkCookie(){
            if($cookies.getObject(cookieKey) === undefined || $cookies.getObject(cookieKey) === null){
                $rootScope.userInfo = {};
            } else {
                $rootScope.userInfo = $cookies.getObject(cookieKey);
            }
            console.log("$cookies get : ", $rootScope.userInfo);
        }

        // Check User login
        $rootScope.checkUserLoggedIn = function(){
            return angular.equals({}, $rootScope.userInfo);
        };

        // Register Success Msg
        $rootScope.registerSuccessMsg = false;
        $scope.$on('onRegisterSuccess', function () {
            $rootScope.registerSuccessMsg = true;
        });

        // Initialize page render object
        $scope.renderPagesObj = {
            login: false,
            register: false,
            productList: false,
            productDetails: false,
            productCreate: false,
            cartList: false,
            publicCart: false,
            orderList: false
        };

        // Initialize Uploaded images collection
        $rootScope.imageAdded = [];
        // Initialize cart list
        $rootScope.cartListing = [];
        // Initialize submit data
        $rootScope.submitDataError = false;

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
