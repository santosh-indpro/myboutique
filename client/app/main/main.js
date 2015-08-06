'use strict';

angular.module('myboutiqueApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

  }).directive('ngDropZone', function () {

        /*
        function link(scope, element, attrs) {
            // Add dropzone
            $(element).html('<div class="dropzone" id="' + attrs.ngDropZone + '"></div>');
            // Init Dropzone
            var myDropzone = new Dropzone("div#" + attrs.ngDropZone, { url: "/images"});
            // After upload to server
            myDropzone.on("success", function(param1, uploadedfileName) {
                scope.$root.imageAdded.push(uploadedfileName);
                console.log("File uploaded obj filesNamesCollection: ",scope.$root.imageAdded);
            });
        }

        return {
            restrict: "AE",
            link: link
        };
        */

    }).directive('ngCarouselInit', function () {

        /*
        function link(scope, element, attrs) {
            $(element).carousel({
                interval: 5000 //changes the speed
            })
        }

        return {
            restrict: "AE",
            link: link
        };
        */

    });