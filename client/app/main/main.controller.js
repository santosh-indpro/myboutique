'use strict';

angular.module('myboutiqueApp')
    .controller('MainCtrl', function ($scope, $rootScope, $http) {

        // Initialize page render object
        $scope.renderPagesObj = {
            mainMenu: false,
            productList: false,
            productDetails: false,
            productCreate: false,
            orderList: false
        };

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
                $scope.productDetails = productDetails;
            });
        });

    });
