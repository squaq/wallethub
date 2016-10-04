'use strict';

/**
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
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
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
        .state('person', {
                url:'/person',
              templateUrl: 'views/person.html',
              controller: 'PersonCtrl'
        })
        .state('list.item', {
                url:'/:item',
              templateUrl: 'views/item.html',
              controller: 'ItemCtrl'
        });
    $urlRouterProvider.otherwise('/');
}])
.service("shareData", function ShareData(){
    var shareData = this;
    shareData.cont = 0;
    shareData.selectedPersona = {};
    shareData.allData = null;
})

//copy and past code from stackoverflow
.directive('formatPhone', [
    function() {
        return {	
            restrict: 'A',
			link: function (scope, elem, attrs, ctrl, ngModel) {
				elem.on('keyup', function () {
					var input = elem.val();
					// Strip all characters from the input except digits
					input = input.replace(/\D/g, '');

					// Trim the remaining input to ten characters, to preserve phone number format
					input = input.substring(0, 10);

					// Based upon the length of the string, we add formatting as necessary
					var size = input.length;
					if (size == 0) {
						input = input;
					} else if (size < 4) {
						input = '(' + input;
					} else if (size < 7) {
						input = '(' + input.substring(0, 3) + ')' + input.substring(3, 6);
					} else {
						input = '(' + input.substring(0, 3) + ')' + input.substring(3, 6) + '-' + input.substring(6, 10);
					}
                    elem.val(input);
				});
			}
		}
    }
])

//not copied code
.directive('formatCurrency', [
    function() {
        return {	
            restrict: 'A',
			link: function (scope, elem, attrs, ctrl, ngModel) {
				elem.on('keyup', function () {
					var input = elem.val();
					// Strip all characters from the input except digits
					input = input.replace(/\D/g, '');
					input = input.replace(/,/g, '');
					input = input.replace(/\./g, '');
					input = input.replace(/$/g, '');
                    
                    //removeing left zeros 
                    if(input[0]==='0')
                    {
                        if(input[1]==='0'){input.slice(1, size)}
                        input = input.slice(1, size);
                    }
                    //putting zeros to the left
                    var size = input.length;
					if(size === 1){
				        input = '$0,0' + input;
                    }else if(size <= 2){
				        input = '$0,' + input;
					}else {
                    //setting the commas and dots of the number
                        var limit = 6;
                        var cont = 0;
                        var nInput = [];
                        for(var i = size-1; i>=0; i--){
                            if(++cont >= limit){
                                limit = 3;
                                cont = 0;
                                nInput.unshift('.');
                                nInput.unshift(input[i]);
                            }
                            else{
                                nInput.unshift(input[i]);
                            }
                        }
                       
                        nInput = nInput.join('');
                        nInput = '$' + nInput.substr(0, nInput.length-2)+','+nInput.substr(nInput.length-2, nInput.length);
                        input = nInput;
                    }
					elem.val(input);
				});
			}
		}
    }
]);

'use strict';

/**
 * @ngdoc function
 * @name wallethubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wallethubApp
 */
angular.module('wallethubApp')
  .controller('MainCtrl', ["shareData", function (shareData) {
  }]);

'use strict';

angular.module('wallethubApp').controller('ItemCtrl', ["$scope", "$stateParams", "shareData", "$location", function ($scope, $stateParams, shareData, $location) {
    
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
}]);

'use strict';

angular.module('wallethubApp')
  .controller('ListCtrl', ["$scope", "shareData", "$http", "$location", function ($scope, shareData, $http, $location) {
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
    
    
  }]);
'use strict';

angular.module('wallethubApp').controller('PersonCtrl', ["$scope", "$stateParams", "shareData", "$location", function ($scope, $stateParams, shareData, $location) {
    
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
    
}]);
angular.module('wallethubApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/item.html',
    "<div class=\"jumbotron\"> <h2>{{item.name}}</h2> <p>Email : {{item.data.email}}</p> <p>Phone: {{item.data.phone}}</p> <button type=\"button\" class=\"btn btn-default info\" ng-click=\"clickInfo()\">Rate this person</button> </div>"
  );


  $templateCache.put('views/list.html',
    "<div ui-view class=\"jumbotrom\"></div> <div class=\"panel panel-default\"> <div class=\"panel-heading\"> <h4>Persona Selection</h4> <div class=\"btn-group\" role=\"group\" aria-label=\"...\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"clickAlign('name')\" id=\"orderByName\">Name</button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"clickAlign('pos')\" id=\"orderByPos\">Position</button> </div> <label class=\"pull-right\"> <span class=\"glyphicon glyphicon-search\"></span> <input ng-model=\"searchText\"> </label> </div> <div class=\"panel-body\"> <div class=\"list-group\"> <button type=\"button\" ng-repeat=\"d in shareData.allData | orderBy:by | filter:searchText\" class=\"list-group-item\" ng-click=\"gotoItem(d.pos)\"> <span class=\"badge\">{{(d.pos)}}</span> <label>{{d.name}}</label> </button> </div> </div> </div>"
  );


  $templateCache.put('views/main.html',
    "<div class=\"jumbotron\"> <h1>'Hello Wallethub!</h1> <h3> This is the Everton Melo's test. </h3> <p>I hope you analize it with a lot of love <span class=\"glyphicon glyphicon-heart\"></span></p> <p><a class=\"btn btn-lg btn-success\" ng-href=\"#/list\">Start!<span class=\"glyphicon glyphicon-ok\"></span></a></p> </div> <div class=\"row marketing\"> <h4>About Test</h4> <p> You can check all test requirements clicking in <a href=\"#/list\">Persona selection</a>. As a good boss there you will be able to give your opnion about the note and deserve salary of a employee . After you can fill your phone number and a suposed barcode where you can use any characters. </p> <h4>Tools</h4> <p>In this test I have used Yeoman to scaffolding the project. All dependencies are in Bower and you can run this project with Grunt.</p> <h4>The only thing that missing.</h4> <p> As I didn't use any accets I have not used require.js and I hope that it won't be a bad thing in my test application. </p> </div>"
  );


  $templateCache.put('views/person.html',
    "<div class=\"container\"> <button type=\"button\" class=\"btn btn-default pull-left info\" ng-click=\"backClick()\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button> <div class=\"jumbotron\"> <h2>{{person.name}}</h2> <p>Email : {{person.data.email}}</p> <p>Phone: {{person.data.phone}}</p> </div> <div class=\"panel panel-default\"> <div class=\"panel-heading\"> <h4>Notes</h4> </div> <div class=\"panel-body\"> <table class=\"table table-bordered\"> <thead> <tr> <th>your rate</th> <th>rate 1</th> <th>rate 2</th> <th>Total</th> </tr> </thead> <tbody> <tr> <td><input type=\"number\" ng-model=\"yourRate\" ng-change=\"validInputRate()\" class=\"codeInput\"></td> <td><label>{{person.data.rate1}}</label></td> <td><label>{{person.data.rate2}}</label></td> <td><input type=\"number\" ng-model=\"total\" ng-change=\"validInputTotal()\" class=\"codeInput\"></td> </tr> </tbody> </table> <table class=\"table table-bordered\"> <tbody> <tr> <th><label>deserved salary</label></th> <th><input type=\"text\" ng-model=\"salary\" format-currency placeholder=\"$$$\" class=\"codeInput\"></th> </tr> <tr> <th><label>Your phone: </label></th> <th><input type=\"text\" ng-model=\"phonenumber\" format-phone placeholder=\"(xxx)xxx-xxxx\" class=\"codeInput\"></th> </tr> </tbody> </table> <table class=\"table table-bordered\"> <thead> <tr><label>supposed barcode</label></tr> </thead> <tbody> <tr> <th> <input type=\"text\" maxlength=\"maxLen\" placeholder=\"xxxxx\" ng-change=\"changingInput('code1')\" ng-model=\"code1\" id=\"code1\" class=\"codeInput\"> </th> <th> <input type=\"text\" maxlength=\"maxLen\" placeholder=\"xxxxx\" ng-change=\"changingInput('code2')\" ng-model=\"code2\" id=\"code2\" class=\"codeInput\"> </th> <th> <input type=\"text\" maxlength=\"maxLen\" placeholder=\"xxxxx\" ng-change=\"changingInput('code3')\" ng-model=\"code3\" id=\"code3\" class=\"codeInput\"> </th> </tr> </tbody> </table> </div> </div> </div>"
  );

}]);
