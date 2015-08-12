'use strict';

angular.module('orderList.ctrl', [])
    .controller('OrderListController', ['$scope', '$http', function ($scope, $http) {
        var productsCollection = [], orderListCollectionModified = [];
        $scope.orderListCollection = [];

        loadOrders();

        function loadOrders(){
            $http.get(''.url('/api/products')).success(function(productListCollection) {
                productsCollection = productListCollection;
                $http.get(''.url('/api/transactions/user-id/' + $scope.userInfo._id)).success(function(orderListCollection) {
                    angular.forEach(orderListCollection, function(orderInfo, orderKey) {
                        angular.forEach(orderInfo.productsList, function(productsListInfo, orderKey) {
                            angular.forEach(productsCollection, function(productInfo, productKey) {
                                if(productsListInfo.productID === productInfo._id){
                                    orderListCollectionModified.push({
                                        productInfo: productInfo,
                                        productOrderInfo: productsListInfo,
                                        transactionInfo: orderInfo
                                    });
                                }
                            });
                        });
                    });
                    console.log("orderListCollectionModified : ", orderListCollectionModified);
                    $scope.orderListCollection = orderListCollectionModified;
                });
            });
        }

    }]);