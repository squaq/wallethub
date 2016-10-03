'use strict';

angular.module('wallethubApp').controller('ItemCtrl', function ($scope, $stateParams, shareData, $location) {
    
    console.log('shareData.allData',shareData.allData)
    if(!shareData.allData)
    {
        $location.path('/list');
        
        return;
    }
    $scope.item = shareData.allData[$stateParams.item] ;
});
