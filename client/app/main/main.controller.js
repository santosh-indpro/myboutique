'use strict';

angular.module('myboutiqueApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get(''.url('/api/things')).success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $http.get(''.url('/api/itemPosted')).success(function(itemPostedCollection) {

      console.log('ItemPosted', itemPostedCollection);

      $scope.itemsCollection = itemPostedCollection;
    });

        $http.get('api/users').success(function(usersCollection) {

            console.log('usersCollection', usersCollection);

            $scope.usersCollection = usersCollection;
        });

        $http.get('api/products').success(function(productsCollection) {

            console.log('productsCollection', productsCollection);

        });

        $http.get('api/transactions').success(function(transactionsCollection) {

            console.log('transactionsCollection', transactionsCollection);

        });

    $scope.addThing = function() {
    if($scope.newThing === '') {
      return;
    }
    //$http.post('/api/things', { name: $scope.newThing });
    $scope.newThing = '';
  };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });