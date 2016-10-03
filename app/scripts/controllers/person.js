'use strict';

angular.module('wallethubApp').controller('PersonCtrl', function ($scope, $stateParams, shareData, $location) {
    
    $scope.person = shareData.selectedPersona;
    
    $scope.backClick = function(){$location.path('/list');}
    
});