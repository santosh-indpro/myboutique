'use strict';

angular.module('productCreate.ctrl', [])
    .controller('productCreateController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

        // Initialize
        $scope.productDetails = {
            userID: '',
            name: '',
            description: '',
            price: '',
            images : [],
            location: '',
            email: '',
            datecreated: Date.now(),
            publishStatus: false
        };

        // Create Product
        $scope.createProduct = function(){
            $http.post(''.url('/api/products/'), $scope.productDetails).success(function(status) {
                $rootScope.$broadcast('onNavigationLinkClicked', 'productList');
            }).error(function(status) {
                console.log('Error - ',status);
            });
        };

    }]);