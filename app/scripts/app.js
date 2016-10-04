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
})
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
