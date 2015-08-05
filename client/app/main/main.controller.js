'use strict';

angular.module('myboutiqueApp')
    .controller('MainCtrl', ['$scope', '$http', '$rootScope',function ($scope, $http, $rootScope) {

        // Initialize page render object
        $scope.renderPagesObj = {
            productList: false,
            productDetails: false,
            productCreate: false,
            orderList: false
        };

        // Initialize Uploaded images collection
        $rootScope.imageAdded = [];

        // Detect phone
        $rootScope.onPhone = false;
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            $rootScope.onPhone = true;
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
                    $scope.renderPagesObj[prop] = !$scope.renderPagesObj[prop];
                } else {
                    $scope.renderPagesObj[prop] = false;
                }
            }
        }

        // Get Product Details By Id
        $scope.$on('onGetProductDetailsById', function (event, productId) {
            $http.get(''.url('/api/products/' + productId)).success(function(productDetails) {
                $scope.productImagesForCarousel = [];
                $scope.productDetails = productDetails;
                angular.forEach($scope.productDetails.images, function(value, key) {
                    $scope.productImagesForCarousel.push({
                        key: key,
                        name: value,
                        first: (key === 0)?(true):(false)
                    });
                });
            });
        });

    }]);
