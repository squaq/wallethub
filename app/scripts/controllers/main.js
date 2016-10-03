'use strict';

/**
 * @ngdoc function
 * @name wallethubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wallethubApp
 */
angular.module('wallethubApp')
  .controller('MainCtrl', function (shareData) {
    console.log(shareData.cont)
    shareData.cont = shareData.cont+1;
    
  });
