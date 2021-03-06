'use strict';

angular.module('myboutiqueApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ui.components',
  'reCAPTCHA'

]).config(function ($stateProvider, $urlRouterProvider, reCAPTCHAProvider) {

    if( window.location.href.indexOf('public-view') > -1 ){
        $urlRouterProvider.otherwise('/public-view');
    }else{
        $urlRouterProvider.otherwise('/');
    }

        // required: please use your own key :)
        reCAPTCHAProvider.setPublicKey('6LeIxwETAAAAAIQgt52lrhcTzN8zWVmf059FEi8b');

        // optional: gets passed into the Recaptcha.create call
        reCAPTCHAProvider.setOptions({
            theme: 'clean'
        });

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
    //'serverApiBaseURL' : 'http://dev1.indpro.se:5000'
    'serverApiBaseURL' : 'http://192.168.1.65:3000'
};
var cookieKey = 'MyBtqCk';
var userInfo = {};

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