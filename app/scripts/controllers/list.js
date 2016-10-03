'use strict';

angular.module('wallethubApp')
  .controller('ListCtrl', function ($scope, shareData, $http, $location) {
    $scope.shareData = shareData;
    $scope.showError = false;
    
    
    if(!$scope.shareData.allData){
        downloadData();
    }
    
    
    function createData(data){
        $scope.shareData.allData = null;
        $scope.shareData.allData = [];
        for(var i in data){
            $scope.shareData.allData.push({'name':data[i].name, 'pos':i, 'data':data[i]});
       }
//        console.log($scope.shareData.allData);
    }
    
    function downloadData(){
        $http.get('data/data.json').then(
        function(success){
            createData(success.data);
        }, 
        function(error){
            $scope.showError = true;
//            console.log('error',error);
        });
    }
    
    $scope.gotoItem = function(id){
        shareData.selectedPersona = $scope.shareData.allData[id];
        $location.path("/list/"+id);
    }
    
    
    
  });