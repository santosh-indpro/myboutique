'use strict';

angular.module('myboutiqueApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('public-view', {
                url: '/public-view',
                templateUrl: 'app/public-view/publicView.html',
                controller: 'publicViewCtrl'
            });
    });