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
        }

        return {
            restrict: "AE",
            link: link
        };

    });