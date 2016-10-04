'use strict';

angular.module('wallethubApp')
  .controller('ListCtrl', function ($scope, shareData, $http, $location) {
    $scope.shareData = shareData;
    $scope.showError = false;
    $scope.by = '';
    
    if(!$scope.shareData.allData){
        downloadData();
    }
    
    
    function createData(data){
        $scope.shareData.allData = null;
        $scope.shareData.allData = [];
        for(var i in data){
            $scope.shareData.allData.push({'name':data[i].name, 'pos':parseInt(i)+1, 'data':data[i]});
       }
    }
    
    function downloadData(){
        $http.get('data/data.json').then(
        function(success){
            createData(success.data);
        }, 
        function(error){
            $scope.showError = true;
        });
    }
    
    
    //open tab selections
    $scope.gotoItem = function(id){
        shareData.selectedPersona = $scope.shareData.allData[id];
        $location.path("/list/"+id);
    }
    
    
    //ordering the list
    $scope.clickAlign = function(by){
        
        $scope.by = by;   
        if(by === 'name'){
            angular.element('#orderByName').addClass('disabled');
            angular.element('#orderByPos').removeClass('disabled');
        }
        else{
            angular.element('#orderByPos').addClass('disabled');
            angular.element('#orderByName').removeClass('disabled');

        }
        
    }
    //first order
    $scope.clickAlign('name');
    
    
  });