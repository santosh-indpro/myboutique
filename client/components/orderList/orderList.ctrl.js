'use strict';

angular.module('orderList.ctrl', [])
    .controller('OrderListController', ['$scope', '$http', function ($scope, $http) {
        var productsCollection = [], orderListCollectionModified = [], cartProductsArr = [];
        $scope.orderListCollection = [];

        loadOrders();

        function loadOrders(){
            $http.get(''.url('/api/products')).success(function(productListCollection) {
                productsCollection = productListCollection;
                $http.get(''.url('/api/transactions')).success(function(orderListCollection) {
                    angular.forEach(orderListCollection, function(orderInfo, orderKey) {
                        cartProductsArr = [];
                        angular.forEach(orderInfo.productsList, function(productsListInfo, orderKey) {
                            angular.forEach(productsCollection, function(productInfo, productKey) {
                                if(productsListInfo.productID === productInfo._id){
                                    cartProductsArr.push(productInfo);
                                }
                            });
                        });
                        orderInfo.productsList = cartProductsArr;
                        orderListCollectionModified.push(orderInfo);
                    });
                    console.log("orderListCollectionModified : ", orderListCollectionModified);
                    $scope.orderListCollection = orderListCollectionModified;
                });
            });
        }

    }]);