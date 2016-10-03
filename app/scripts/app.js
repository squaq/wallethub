'use strict';

/**
 * @ngdoc overview
 * @name wallethubApp
 * @description
 * # wallethubApp
 *
 * Main module of the application.
 */
angular
  .module('wallethubApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch', 
    'ui.router'
  ])
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
      .state('home', {
            url:'/', 
            templateUrl:'views/main.html',
            controller: 'MainCtrl'
      
        })  
        .state('list', {
                url:'/list',
              templateUrl: 'views/list.html',
              controller: 'ListCtrl'
        })
        .state('list.item', {
                url:'/:item',
              templateUrl: 'views/item.html',
              controller: 'ItemCtrl'
        })
})
.service("shareData", function ShareData(){
    var shareData = this;
    shareData.cont = 0;
    shareData.selectedPersona = {};
    shareData.allData = null;
});
