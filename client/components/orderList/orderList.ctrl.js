'use strict';

angular.module('orderList.ctrl', [])
    .controller('OrderListController', ['$scope', '$http', function ($scope, $http) {
        var productsCollection = [], orderListCollectionModified = [];
        $scope.orderListCollection = [];

        loadOrders();
        function loadOrders() {
            $http.get(''.url('/api/products')).success(function(productListCollection) {
                productsCollection = productListCollection;
                $http.get(''.url('/api/transactions/owner-id/' + $scope.userInfo._id)).success(function(orderListCollection) {
                    console.log("orderListCollection : ", orderListCollection);
                    angular.forEach(orderListCollection, function(orderInfo, orderKey) {
                        angular.forEach(productsCollection, function(productInfo, productKey) {
                            if(orderInfo.prdInfo.productID === productInfo._id){
                                orderListCollectionModified.push({
                                    productInfo: productInfo,
                                    productOrderInfo: orderInfo.prdInfo,
                                    transactionInfo: orderInfo.trnInfo
                                });
                            }
                        });
                    });
                    console.log("orderListCollectionModified : ", orderListCollectionModified);
                    $scope.orderListCollection = orderListCollectionModified;
                });
            });
        }

    }]);