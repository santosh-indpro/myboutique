'use strict';

angular.module('myboutiqueApp')
    .controller('MainCtrl', function ($scope, $rootScope, $http) {

        // Initialize
        $scope.productDetails = {};

        // Initialize page render object
        $scope.renderPagesObj = {
            productList: false,
            productDetails: false,
            orderList: false
        };

        // Start Page
        openSelectedPage('productList');

        // Navigate to selected page
        $scope.$on('onNavigationLinkClicked', function (event, args) {
            openSelectedPage(args);
        });

        // Function to navigate to selected page
        function openSelectedPage(selectedPage){
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
                $scope.productDetails = productDetails;
            });
        });

    });
