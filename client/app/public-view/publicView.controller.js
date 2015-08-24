angular.module('myboutiqueApp')
    .controller('publicViewCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

        // Client App config
        $rootScope.clientAppConfiguration = clientAppConfiguration;

        // Open public cart page
        $scope.renderPagesObj = {
            login: false,
            register: false,
            productList: false,
            productDetails: false,
            productCreate: false,
            cartList: false,
            publicCart: true,
            orderList: false
        };

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

    }]);