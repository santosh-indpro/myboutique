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
            console.log("DropZone--");
            // Add dropzone
            $(element).html('<div class="dropzone" id="' + attrs.ngDropZone + '"></div>');
            // Init Dropzone
            var myDropzone = new Dropzone("div#" + attrs.ngDropZone,
                {
                    url: "/images",
                    accept: function(file, done) {
                        console.log("Checking uploaded file-type : ",file);
                        if (file.type != "image/jpeg" || file.type != "image/png" || file.type != "image/gif" || file.type != "image/bmp") {
                            done();
                        }
                        else { done("Error! Files of this type are not accepted"); }
                    }
                }
            );
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

    }).directive('ngCarouselInit', function () {

        function link(scope, element, attrs) {
            console.log("Carousel");
            $(element).carousel({
                interval: 2000 //changes the speed
            })
        }

        return {
            restrict: "AE",
            link: link
        };

    }).directive('ngPopover', function () {

        function link(scope, element, attrs) {

            $(element).attr('id', attrs['ngPopover']);

            $(function () {
                // Activate popover
                $("#"+attrs['ngPopover']).popover({
                    html: true,
                    placement: 'top',
                    content: function() {
                        return $('#popover-content'); //<-- Remove .html()
                    }
                });
                // Close popover when clicking outside
                $('body').on('click', function (e) {
                    $("#"+attrs['ngPopover']).each(function () {
                        //the 'is' for buttons that trigger popups
                        //the 'has' for icons within a button that triggers a popup
                        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                            $(this).popover('hide');
                        }
                    });
                });
                // Select URL
                $('textarea.prdPublicURL').on('click', function () {
                    $(this).select();
                });
            })

        }

        return {
            restrict: "AE",
            link: link
        };

    });