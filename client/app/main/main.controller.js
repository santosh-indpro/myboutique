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