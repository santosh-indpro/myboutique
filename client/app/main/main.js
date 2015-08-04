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

        function link(scope, element, attrs) {
            // Add dropzone
            $(element).html('<div class="dropzone" id="' + attrs.ngDropZone + '"></div>');

            // Init Dropzone
            var myDropzone = new Dropzone("div#" + attrs.ngDropZone, { url: "/images"});

            // Config
            /*Dropzone.options.myAwesomeDropzone = {
                paramName: "file", // The name that will be used to transfer the file
                maxFilesize: 2, // MB
                accept: function(file, done) {
                    if (file.name == "justinbieber.jpg") {
                        done("Naha, you don't.");
                    }
                    else { done(); }
                }
            };*/
        }

        return {
            restrict: "AE",
            link: link
        };

    });