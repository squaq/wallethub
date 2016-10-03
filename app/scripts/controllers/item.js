'use strict';

angular.module('wallethubApp').controller('ItemCtrl', function ($scope, $stateParams, shareData, $location) {
    
    if(!shareData.allData)
    {
        $location.path('/list');
        return;
    }
    
    $scope.item = shareData.allData[parseInt($stateParams.item)-1];
    
    $scope.clickInfo = function(){
        shareData.selectedPersona = shareData.allData[parseInt($stateParams.item)-1];
        $location.path('/person');
    }
});
