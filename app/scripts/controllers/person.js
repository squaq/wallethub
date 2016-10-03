'use strict';

angular.module('wallethubApp').controller('PersonCtrl', function ($scope, $stateParams, shareData, $location) {
    
    $scope.person = shareData.selectedPersona;
    $scope.yourRate = 0;
    $scope.total = $scope.person.data.rate1 + $scope.person.data.rate2 + $scope.yourRate;
    
    $scope.backClick = function(){$location.path('/list');}
    
    $scope.validInputRate = function(){
        if($scope.yourRate < 0 ){
            $scope.yourRate = 10;
        }
        if($scope.yourRate > 10 ){
            $scope.yourRate = 0;
        }
        
        $scope.total = $scope.person.data.rate1 + $scope.person.data.rate2 + $scope.yourRate;
    }
    
    $scope.validInputTotal = function(){
        if($scope.total > ($scope.person.data.rate1 + $scope.person.data.rate2 + 10) ){
            $scope.total = ($scope.person.data.rate1 + $scope.person.data.rate2);
        }
        if($scope.total < ($scope.person.data.rate1 + $scope.person.data.rate2)){
            $scope.total = ($scope.person.data.rate1 + $scope.person.data.rate2);
        }
        
        $scope.yourRate = $scope.total - ($scope.person.data.rate1 + $scope.person.data.rate2)
    }
    
});