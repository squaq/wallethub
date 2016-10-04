'use strict';

angular.module('wallethubApp').controller('PersonCtrl', function ($scope, $stateParams, shareData, $location) {
    
    if(!shareData.allData){
        $location.path('/list');
        return;
    }
    
    
    $scope.person = shareData.selectedPersona;
    $scope.yourRate = 0;
    $scope.total = $scope.person.data.rate1 + $scope.person.data.rate2 + $scope.yourRate;
    $scope.phonenumber = null;
    $scope.salary = null;
    $scope.backClick = function(){$location.path('/list');}
    
    //barcode vars and models
    $scope.code1 = '';
    $scope.code2 = '';
    $scope.code3 = '';
    $scope.maxLen = 5;
    
    
    
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
    
    
    //barcode checking lenght and passing to the next or last
    $scope.changingInput = function(id){
         
         if($scope[id].length >= $scope.maxLen)
         {
             var focus = (id === 'code1')? '#code2': '#code3';
             if(id !== 'code3'){ angular.element(focus).focus(); }
         }
         
         if($scope[id].length === 0)
         {
             var focus = (id === 'code3')? '#code2': '#code1';
             if(id !== 'code1'){ angular.element(focus).focus();}
         }
     }
    
});