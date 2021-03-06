'use strict';

angular.module('productCreate.ctrl', [])
    .controller('productCreateController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

        // Initialize
        $scope.productDetails = {
            userID: $rootScope.userInfo._id,
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
            console.log("Submitted data");
            // Collection from Web/Mobile
            console.log("ADDED IMAGES >>>>> ");
            console.log($rootScope.imageAdded);
            /*for(var i=0; i < $rootScope.imageAdded.length; i++){
                console.log($rootScope.imageAdded[i]);
            }*/

            $scope.productDetails.images = $rootScope.imageAdded;

            $http.post(''.url('/api/products/'), $scope.productDetails).success(function(status) {
                $rootScope.imageAdded = [];
                $rootScope.$broadcast('onNavigationLinkClicked', 'productList');
            }).error(function(status) {
                console.log('Error - ',status);
            });
        };

        // Mobile Upload
        $scope.imageAdded = [];
        $scope.onAddImage = function(){

            try{
                // Upload image to server
                var upload = function (imageURI, index) {

                    $scope.imageAdded.push({key : 'PLACEHOLDER' + index, value: ''});
                    $scope.$apply();

                    var ft = new FileTransfer(),
                        options = new FileUploadOptions();

                    options.fileKey = "file";
                    options.fileName = 'filename.jpg'; // We will use the name auto-generated by Node at the server side.
                    options.mimeType = "image/jpeg";
                    options.chunkedMode = false;
                    options.params = { // Whatever you populate options.params with, will be available in req.body at the server-side.
                        "description": "Uploaded from my phone"
                    };

                    var c = ft.upload(imageURI, $rootScope.clientAppConfiguration.serverApiBaseURL + "/images",
                        function (res) {

                            setTimeout(function(index){
                                var imagePlacedInCycle = false;
                                angular.forEach($scope.imageAdded, function(value, key) {
                                    if(value.value === '' && imagePlacedInCycle === false)
                                    {
                                        imagePlacedInCycle = true;
                                        console.log('URI - ',$rootScope.clientAppConfiguration.serverApiBaseURL);
                                        $scope.imageAdded[key].value = $rootScope.clientAppConfiguration.serverApiBaseURL + '/' + res.response;
                                        $rootScope.imageAdded.push(res.response);
                                    }
                                });
                                $scope.$apply();

                            }, 1000);
                        },
                        function (e) {
                            console.log("Upload failed");
                        }, options);
                };

                window.imagePicker.getPictures(
                    function(results) {
                        for (var i = 0; i < results.length; i++) {
                            console.log('Image URI: ' + results[i]);
                            upload(results[i],i);
                        }
                    }, function (error) {
                        console.log('Error: ' + error);
                    });
            }
            catch(e){
                console.log("Error : ", e);
            }
        };

        console.log(" $scope.imageAdded ", $scope.imageAdded );

    }]);