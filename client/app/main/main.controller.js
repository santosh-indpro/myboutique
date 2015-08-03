'use strict';

angular.module('myboutiqueApp')
    .controller('MainCtrl', function ($scope, $http) {
        $scope.awesomeThings = [];

        console.log('This is from Controller');

        $scope.renderProductListing = true;
        $scope.renderOrderListing = false;

        $http.get(''.url('/api/things')).success(function(awesomeThings) {
            $scope.awesomeThings = awesomeThings;
        });

        $http.get(''.url('/api/products')).success(function(productsCollection) {
            console.log('productsCollection', productsCollection);
            $scope.productsCollection = productsCollection;
        });

        $http.get(''.url('/api/users')).success(function(usersCollection) {
            console.log('usersCollection', usersCollection);
            $scope.usersCollection = usersCollection;
        });

        $http.get(''.url('/api/transactions')).success(function(transactionsCollection) {
            console.log('transactionsCollection', transactionsCollection);
        });

        $scope.$on('onNavigationLinkClicked', function (event, args) {
            if(args === 'productList'){
                $scope.renderProductListing = !$scope.renderProductListing;
                $scope.renderOrderListing = false;
            }else if(args === 'orderList'){
                $scope.renderProductListing = false;
                $scope.renderOrderListing = !$scope.renderProductListing;
            }
        });

        setTimeout(function(){
            console.log('This is from Controller SetTimeout');
        }, 3000);
    });
