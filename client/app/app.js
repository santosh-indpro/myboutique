'use strict';

angular.module('myboutiqueApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ui.components'
])
  .config(function ($stateProvider, $urlRouterProvider /*, $locationProvider */) {
    $urlRouterProvider.otherwise('/');

    //TODO: Need to configure the location provider if accessing app in browser or we may need to remove this.
    //$locationProvider.html5Mode(true);
  }).directive('ngFastClick', function () {

        function link(scope, element, attrs) {
            console.log("Fast Click");
            $(function() {
                FastClick.attach(document.body);
            });
        }

        return {
            restrict: "AE",
            link: link
        };

    });

var clientAppConfiguration = {
    'runningAsApp' : true,
    'serverApiBaseURL' : 'http://192.168.1.134:3000'
};

//Method : extending the String type for format function support.
String.prototype.format = function () {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

//Method : extending the String type for url function support.
String.prototype.url = function () {
    var urlString = this;
    if(arguments.length > 0)
    {
        if(clientAppConfiguration.runningAsApp === true){
            urlString = '{0}{1}'.format(clientAppConfiguration.serverApiBaseURL,arguments[0]);
        }
    }

    return urlString;
};