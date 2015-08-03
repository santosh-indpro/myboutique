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
            console.log('Attrs : ', attrs.ngDropZone);
            $(element).html('<div id="' + attrs.ngDropZone + '"><span>Drop Files here</span></div>');

            // Dropzone class:
            var myDropzone = new Dropzone("div#" + attrs.ngDropZone, { url: "/images"});
        }

        return {
            restrict: "AE",
            link: link
        };

    });